"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { MixpanelServiceAccount } from "@/types/globalTypes";
import CreateServiceAccount from "./CreateServiceAccount";

type MixpanelEvent = Record<string, string>;

interface ApiResponse {
  count: number;
  events: MixpanelEvent[];
  error?: string;
}

const COLUMNS = [
  "Time", "Distinct ID", "Browser", "City", "Current URL", "Device ID",
  "Initial Referrer", "Initial Referring Domain", "Referrer", "Referring Domain",
  "Region", "Search Engine", "Current Domain", "Page Title", "URL Path",
  "URL Protocol", "Country", "UTM Source", "URL Search",
];

function exportToCSV(events: MixpanelEvent[], from: string, to: string) {
  const header = COLUMNS.join(",");
  const rows = events.map((ev) =>
    COLUMNS.map((col) => {
      const val = ev[col] ?? "—";
      return /[,"\n]/.test(val) ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(",")
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mixpanel-events-${from}-to-${to}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function MixpanelExplorer() {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const [from, setFrom] = useState(formatDate(sevenDaysAgo));
  const [to, setTo] = useState(formatDate(today));

  const [accounts, setAccounts] = useState<MixpanelServiceAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    const supabase = createClient();
    const { data } = await supabase
      .from("mixpanel_accounts")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) {
      setAccounts(data);
      if (data.length > 0) setSelectedAccountId(data[0].id);
    }
  }

  async function fetchEvents() {
    const account = accounts.find((a) => a.id === selectedAccountId);
    if (!account) {
      setError("Please select a service account");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const params = new URLSearchParams({
      from,
      to,
      username: account.service_account_username,
      secret: account.service_account_secret,
      project_id: account.project_id,
    });
    if (eventName.trim()) params.set("event", eventName.trim());

    try {
      const res = await fetch(`/api/mixpanel?${params.toString()}`);
      const data: ApiResponse = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Unknown error");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="basic-padding">
      <div className="flex-center-spacebetween">
        <h1>Mixpanel Event Explorer</h1>
        <CreateServiceAccount onAccountsChanged={fetchAccounts} />
      </div>

      <div>
        <p>Select a Service Account:</p>
        <select
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
          >
            {accounts.length === 0 && <option value="">No accounts — add one</option>}
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>{a.account_name}</option>
            ))}
          </select>
          <div className="basic-margin-top-bottom">
            <p>Select a date range:</p>
            <div className="flex-center-start no-flex-grow">
              <label className="flex-start-start flex-column no-flex-grow" style={{marginRight: '25px'}}>
                From &nbsp;
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
              </label>
              <label className="flex-start-start flex-column">
                To &nbsp;
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
              </label>
            </div>
          </div>
          <div className="basic-margin-top-bottom">
            <p>Event name (optional)</p>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g. $mp_web_page_view"
            />
          </div>
          

        
        
      </div>
      
         <button onClick={fetchEvents} disabled={loading}>
          {loading ? "Loading..." : "Fetch Events"}
        </button>

      {error && <p className="mixpanel-error">{error}</p>}

      {result && (
        <div className="mixpanel-results">
          <div className="mixpanel-results-header">
            <p>
              {result.count} events returned for {from} &rarr; {to}
              {eventName ? ` · filtered to "${eventName}"` : ""}
            </p>
            <button className="mixpanel-export-btn" onClick={() => exportToCSV(result.events, from, to)}>
              Export CSV
            </button>
          </div>
          <div className="table-wrapper">
            <table className="mixpanel-table">
              <thead>
                <tr>{COLUMNS.map((col) => <th key={col}>{col}</th>)}</tr>
              </thead>
              <tbody>
                {result.events.map((ev, i) => (
                  <tr key={i}>
                    {COLUMNS.map((col) => <td key={col}>{ev[col] ?? "—"}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { MixpanelServiceAccount } from '@/types/globalTypes';

export default function CreateServiceAccount({ onAccountsChanged }: { onAccountsChanged?: () => void }) {
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<MixpanelServiceAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    account_name: '',
    project_id: '',
    service_account_username: '',
    service_account_secret: '',
  });

  useEffect(() => {
    if (open) fetchAccounts();
  }, [open]);

  async function fetchAccounts() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('mixpanel_accounts')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) setAccounts(data);
  }

  async function handleCreate() {
    if (!formData.account_name || !formData.project_id || !formData.service_account_username || !formData.service_account_secret) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: insertError } = await supabase
      .from('mixpanel_accounts')
      .insert([formData]);
    if (insertError) {
      setError(insertError.message);
    } else {
      setFormData({ account_name: '', project_id: '', service_account_username: '', service_account_secret: '' });
      fetchAccounts();
      onAccountsChanged?.();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from('mixpanel_accounts').delete().eq('id', id);
    fetchAccounts();
    onAccountsChanged?.();
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Manage Service Accounts</button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex-between-center" style={{ marginBottom: '20px' }}>
              <h2 className="no-text-spacing">Mixpanel Service Accounts</h2>
              <button className="system-button" onClick={() => setOpen(false)}>✕</button>
            </div>

            {accounts.length > 0 ? (
              <table style={{ width: '100%', marginBottom: '24px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', paddingBottom: '8px' }}>Name</th>
                    <th style={{ textAlign: 'left', paddingBottom: '8px' }}>Project ID</th>
                    <th style={{ textAlign: 'left', paddingBottom: '8px' }}>Username</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} style={{ borderTop: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '10px 0' }}>{account.account_name}</td>
                      <td style={{ padding: '10px 0' }}>{account.project_id}</td>
                      <td style={{ padding: '10px 0' }}>{account.service_account_username}</td>
                      <td style={{ padding: '10px 0', textAlign: 'right' }}>
                        <button className="system-button" onClick={() => handleDelete(account.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ opacity: 0.5, marginBottom: '24px' }}>No service accounts yet.</p>
            )}

            <h3 className="no-text-spacing" style={{ marginBottom: '12px' }}>Add Account</h3>
            <div className="flex-start-start flex-column" style={{ gap: '10px' }}>
              <div className="form-input-wrapper">
                <label>Account Name</label>
                <input
                  type="text"
                  placeholder="e.g. Design Elixir"
                  value={formData.account_name}
                  onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                />
              </div>
              <div className="form-input-wrapper">
                <label>Project ID</label>
                <input
                  type="text"
                  placeholder="Mixpanel project ID"
                  value={formData.project_id}
                  onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                />
              </div>
              <div className="form-input-wrapper">
                <label>Service Account Username</label>
                <input
                  type="text"
                  value={formData.service_account_username}
                  onChange={(e) => setFormData({ ...formData, service_account_username: e.target.value })}
                />
              </div>
              <div className="form-input-wrapper">
                <label>Service Account Secret</label>
                <input
                  type="password"
                  value={formData.service_account_secret}
                  onChange={(e) => setFormData({ ...formData, service_account_secret: e.target.value })}
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Adding...' : 'Add Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
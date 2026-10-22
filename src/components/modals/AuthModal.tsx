import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReopen?: () => void; // Thêm callback để gọi mở lại form
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onReopen }) => {
  const [email, setEmail] = useState('chuvuon.krongpac@vwing.vn');
  const [password, setPassword] = useState('••••••••••••');
  const [loggedIn, setLoggedIn] = useState(false);

  // Tự động bật lại form sau 1 phút (60000ms) kể từ khi modal ĐÓNG
  useEffect(() => {
    if (isOpen) return; // Nếu đang mở thì không đếm giờ

    const timer = setTimeout(() => {
      if (onReopen) {
        onReopen();
      }
    }, 30000); // 1 phút = 60.000 ms

    return () => clearTimeout(timer);
  }, [isOpen, onReopen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      setLoggedIn(false);
      onClose();
    }, 1200);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Auth" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#0a1b2a] text-slate-900 dark:text-white p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Cổng Đối Tác &amp; Chủ Vườn
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Đăng nhập để xem bản đồ bay và nhật ký lô cây
            </p>
          </div>
          <button
            aria-label="Đóng" onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {loggedIn ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold">Đăng nhập thành công!</h4>
            <p className="text-xs text-slate-500">Đang đồng bộ dữ liệu bản đồ trực thăng...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 pt-5">
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-slate-600 dark:text-slate-300 mb-1">
                Tài khoản / Email HTX
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-slate-600 dark:text-slate-300 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
              <span className="font-semibold block">Tài khoản Demo thử nghiệm:</span>
              <span>Chủ Vườn Krông Pắc (HTX Cây Ăn Trái Cư M'gar)</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Truy Cập Trung Tâm Quản Lý Vườn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
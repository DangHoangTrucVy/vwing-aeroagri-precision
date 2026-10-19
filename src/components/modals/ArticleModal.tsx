import React from 'react';
import { X, BookOpen, Calendar, Clock, Share2 } from 'lucide-react';
import { NewsArticle } from '../../types';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Article" className="fixed inset-0 z-50 flex items-start justify-center pt-28 pb-4 px-3 sm:px-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0c1a26] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 sm:p-6 bg-white/95 dark:bg-[#0c1a26]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
          </div>

          <button
            aria-label="Đóng" onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {article.publisher}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              {article.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Thời gian đọc: {article.readTime}
              </span>
              <span>·</span>
              <span>Chuyên đề: Viễn Thám Nông Nghiệp Thân Gỗ</span>
            </div>
          </div>

          {/* Lead Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic text-slate-700 dark:text-slate-300 text-base leading-relaxed">
            "{article.summary}"
          </div>

          {/* Body paragraphs */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
            {article.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Footer of modal */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Nguồn tài liệu: Ban biên tập Khoa học Nông nghiệp VWING</span>
            <button
              onClick={() => alert('Đã sao chép liên kết bài viết vào bộ nhớ tạm!')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

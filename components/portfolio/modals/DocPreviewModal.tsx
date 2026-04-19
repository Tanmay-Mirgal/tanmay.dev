"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Download } from "lucide-react";

interface DocPreviewModalProps {
  previewDoc: { url: string; title: string } | null;
  setPreviewDoc: (doc: { url: string; title: string } | null) => void;
}

export const DocPreviewModal = ({ previewDoc, setPreviewDoc }: DocPreviewModalProps) => {
  if (!previewDoc) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2500] flex items-center justify-center p-2 min-[400px]:p-4 md:p-6 bg-black/98 backdrop-blur-3xl">
      <div className="absolute inset-0" onClick={() => setPreviewDoc(null)} />
      <button onClick={() => setPreviewDoc(null)} className="fixed top-4 right-4 text-white/50 hover:text-[#D4AF37] z-[2501] border border-white/10 bg-black/50 p-2 min-[400px]:p-3 rounded-full hover:bg-white/10 backdrop-blur-md transition-all"><X size={20} /></button>
      <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }} className="relative w-full max-w-5xl h-[85vh] bg-[#050505] border border-[#D4AF37]/30 flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 min-[400px]:p-6 border-b border-white/10 flex flex-col min-[640px]:flex-row items-start min-[640px]:items-center justify-between gap-4 bg-black/50 backdrop-blur-md">
          <div className="pr-12 min-[640px]:pr-0">
            <p className="text-[#D4AF37] font-mono text-[8px] min-[400px]:text-[10px] uppercase mb-1 tracking-widest">SYSTEM_DOC_VIEWER</p>
            <h3 className="text-lg min-[400px]:text-2xl font-display font-medium text-white uppercase tracking-tight">{previewDoc.title}</h3>
          </div>
          <a href={previewDoc.url} download className="w-full min-[640px]:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-[#D4AF37] text-black font-mono font-bold uppercase tracking-wider text-[9px] min-[400px]:text-[10px] hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95"><Download size={14} /> DOWNLOAD_FILE</a>
        </div>
        <div className="flex-1 bg-[#111] relative overflow-hidden">
          <iframe src={`${previewDoc.url}#toolbar=0`} className="w-full h-full border-none" title="Document Preview" />
          <div className="absolute inset-0 pointer-events-none border-[10px] min-[400px]:border-[20px] border-black/5" />
        </div>
        <div className="p-3 min-[400px]:p-4 border-t border-white/5 bg-black/30 flex justify-between items-center text-[7px] min-[400px]:text-[8px] font-mono text-white/30 tracking-[0.2em] uppercase">
          <span>SECURE_CONNECTION: ESTABLISHED</span>
          <span className="hidden min-[400px]:inline">ENCRYPTION: AES-256</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

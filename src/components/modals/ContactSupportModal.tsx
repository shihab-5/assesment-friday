'use client';

import React, { useState } from 'react';
import { ModalSheet } from '@/components/common/ModalSheet';
import { OrderData } from '@/types/order';
import { MessageSquare, PhoneCall, Mail, Send, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData;
}

export const ContactSupportModal: React.FC<ContactSupportModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [activeTab, setActiveTab] = useState<'options' | 'live_chat' | 'callback_success'>('options');
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: `Hello! I see you're inquiring about order #${order.orderId} (${order.statusTitle}). How can I help you today?`,
      time: 'Just now',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);
    setChatMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Thank you for the message. I have pulled up the courier logs with ${order.carrier.name}. A representative is reviewing the status and will guarantee a resolution.`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const handleRequestCallback = () => {
    setActiveTab('callback_success');
  };

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={() => {
        setActiveTab('options');
        onClose();
      }}
      title={
        activeTab === 'live_chat'
          ? 'Live Support Chat'
          : activeTab === 'callback_success'
          ? 'Callback Requested'
          : 'Customer Support'
      }
      subtitle={`Regarding Order #${order.orderId}`}
      maxWidth="md"
    >
      {activeTab === 'options' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Choose how you would like to connect with our dedicated customer experience team:
          </p>

          <div className="space-y-2.5">
            {/* Live Chat Option */}
            <button
              onClick={() => setActiveTab('live_chat')}
              className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 active:bg-brand-50 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-100 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Start Live Chat</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Online Now
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instant response with automated courier lookup
                </p>
              </div>
            </button>

            {/* Request Phone Callback */}
            <button
              onClick={handleRequestCallback}
              className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Request Phone Callback</span>
                  <span className="text-[11px] text-slate-400 font-medium">~5 min wait</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  We will call the primary phone on your account
                </p>
              </div>
            </button>

            {/* Send Email Ticket */}
            <button
              onClick={() => {
                alert(`Support ticket initiated for Order #${order.orderId}. Confirmation email sent.`);
                onClose();
              }}
              className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Email Support Ticket</span>
                  <span className="text-[11px] text-slate-400 font-medium">&lt; 2h reply</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed inquiry with attached photo/receipt records
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Live Chat Simulated Tab */}
      {activeTab === 'live_chat' && (
        <div className="flex flex-col h-[380px]">
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              autoFocus
            />
            <Button variant="secondary" size="sm" type="submit" icon={<Send className="w-3.5 h-3.5" />}>
              Send
            </Button>
          </form>
        </div>
      )}

      {/* Callback Success Tab */}
      {activeTab === 'callback_success' && (
        <div className="text-center py-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Callback Confirmed</h3>
          <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            A Senior Support Specialist will call the phone number registered with Alex Morgan (+1 •••-•••-0199) within 5 minutes.
          </p>
          <div className="pt-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setActiveTab('options');
                onClose();
              }}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </ModalSheet>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Download, Trash2, Send, Copy, Check, MessageCircle, Share2 } from 'lucide-react';
import { generateWellnessPDF } from '../utils/pdfGenerator';
import api, { resolveAppShareUrl } from '../utils/api';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello. I'm here. This is a safe space to share whatever is on your mind." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [copiedAppLink, setCopiedAppLink] = useState(false);
    const messagesEndRef = useRef(null);
    const appShareUrl = resolveAppShareUrl();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await api.post('/chat', {
                message: userMsg.text,
                history: messages
            });

            const aiMsg = { id: Date.now() + 1, sender: 'ai', text: res.data.reply };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg = { id: Date.now() + 1, sender: 'ai', text: "I'm having trouble connecting right now, but please know I'm here." };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadPDF = (question, answer) => {
        generateWellnessPDF(question, answer);
    };

    const handleClearChat = () => {
        setMessages([{ id: Date.now(), sender: 'ai', text: "We've cleared the space. Ready when you are." }]);
    };
    
    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleCopyAppLink = async () => {
        if (!appShareUrl) return;

        await navigator.clipboard.writeText(appShareUrl);
        setCopiedAppLink(true);
        setTimeout(() => setCopiedAppLink(false), 2000);
    };

    const buildWhatsAppMessage = (question, answer) => {
        const trimmedAnswer = answer.length > 900 ? `${answer.slice(0, 900)}...` : answer;

        return [
            '*A reflection from Uttar*',
            '',
            appShareUrl ? `Try it here: ${appShareUrl}` : '',
            '',
            '_Thought:_',
            question,
            '',
            "_Uttar's reply:_",
            trimmedAnswer,
        ]
            .filter(Boolean)
            .join('\n');
    };

    const handleWhatsAppShare = (question, answer) => {
        const textToShare = buildWhatsAppMessage(question, answer);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const handleNativeShare = async () => {
        if (!appShareUrl || !navigator.share) return;

        try {
            await navigator.share({
                title: 'Uttar',
                text: 'A calm, private space for reflection and emotional support.',
                url: appShareUrl,
            });
        } catch (error) {
            if (error?.name !== 'AbortError') {
                console.error('Share failed:', error);
            }
        }
    };

    return (
        <div className="flex flex-col h-[680px] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,242,236,0.92))] rounded-[28px] heritage-shadow border border-[#d8c6b8] overflow-hidden relative">
            
            {/* Header */}
            <div className="px-6 py-5 bg-white/85 backdrop-blur border-b border-[#dbc7b6] flex flex-wrap justify-between items-center gap-3 z-10">
                <div>
                    <span className="text-[11px] uppercase tracking-[0.34em] font-semibold text-uttar-clay">Private Conversation</span>
                    <p className="mt-1 text-sm text-uttar-charcoal/60">Gentle guidance, preserved in a clean and shareable format.</p>
                </div>
                <div className="flex items-center gap-2">
                    {navigator.share ? (
                        <button
                            onClick={handleNativeShare}
                            className="inline-flex items-center gap-2 rounded-full border border-[#d8c6b8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-uttar-charcoal transition hover:border-uttar-clay hover:text-uttar-clay"
                            title="Share App"
                        >
                            <Share2 size={14} />
                            <span>Share App</span>
                        </button>
                    ) : null}
                    <button
                        onClick={handleCopyAppLink}
                        className="inline-flex items-center gap-2 rounded-full border border-[#d8c6b8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-uttar-charcoal transition hover:border-uttar-clay hover:text-uttar-clay"
                        title="Copy App Link"
                    >
                        {copiedAppLink ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        <span>{copiedAppLink ? 'Copied' : 'Copy Link'}</span>
                    </button>
                    <button 
                        onClick={handleClearChat}
                        className="rounded-full border border-transparent p-2 text-uttar-charcoal/50 transition hover:border-red-200 hover:text-red-500"
                        title="Clear Chat"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(circle_at_top,rgba(188,108,77,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(249,246,242,0.95))]">
                {messages.map((msg, index) => {
                    const isUser = msg.sender === 'user';
                    const nextMsg = messages[index + 1];
                    const isLastAiMsg = !isUser && (!nextMsg || nextMsg.sender === 'user');
                    const previousUserMsg = isLastAiMsg ? messages[index - 1]?.text : null;
                    
                    return (
                        <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[85%] rounded-[24px] px-5 py-4 ${
                                isUser 
                                ? 'bg-[linear-gradient(135deg,#8f4f36,#bc6c4d)] text-white rounded-br-md shadow-[0_16px_36px_-20px_rgba(84,45,28,0.8)]' 
                                : 'bg-[#fffaf5] text-uttar-charcoal border border-[#e3d3c6] rounded-bl-md shadow-[0_18px_42px_-28px_rgba(64,39,26,0.55)]'
                            }`}>
                                <p className="text-[15px] font-heritage-sans font-light leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            </div>
                            
                            {/* AI Message Actions */}
                            {!isUser && (
                                <div className="flex flex-wrap gap-3 mt-3 ml-2 text-xs text-uttar-charcoal/45">
                                    <button 
                                        onClick={() => handleCopy(msg.text, msg.id)}
                                        className="hover:text-uttar-clay transition-colors flex items-center space-x-1"
                                    >
                                        {copiedId === msg.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                        <span>Copy</span>
                                    </button>
                                    
                                    {previousUserMsg && (
                                        <>
                                            <button 
                                                onClick={() => handleDownloadPDF(previousUserMsg, msg.text)}
                                                className="hover:text-uttar-clay transition-colors flex items-center space-x-1"
                                            >
                                                <Download size={14} />
                                                <span className="hidden sm:inline">Save PDF</span>
                                            </button>
                                            <button 
                                                onClick={() => handleWhatsAppShare(previousUserMsg, msg.text)}
                                                className="hover:text-green-600 transition-colors flex items-center space-x-1 text-green-700/80"
                                            >
                                                <MessageCircle size={14} />
                                                <span className="hidden sm:inline">WhatsApp Share</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
                
                {isLoading && (
                    <div className="flex items-start">
                         <div className="bg-[#fffaf5] border border-[#e3d3c6] rounded-2xl rounded-bl-none px-5 py-4 flex space-x-2">
                             <div className="w-2 h-2 rounded-full bg-uttar-clay/40 animate-pulse"></div>
                             <div className="w-2 h-2 rounded-full bg-uttar-clay/40 animate-pulse delay-150"></div>
                             <div className="w-2 h-2 rounded-full bg-uttar-clay/40 animate-pulse delay-300"></div>
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/90 border-t border-[#dbc7b6]">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your heart out..."
                        className="w-full bg-[#f7f0e9] text-uttar-charcoal placeholder-uttar-charcoal/30 border border-[#eadbce] focus:border-uttar-clay/40 focus:bg-white rounded-full py-4 pl-6 pr-14 outline-none transition-all font-heritage-sans text-sm shadow-inner"
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-2.5 bg-[linear-gradient(135deg,#8f4f36,#bc6c4d)] text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none transition-all"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
            
        </div>
    );
};

export default ChatInterface;

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (error: any) {
            alert("Erro: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 fade-in border border-gray-100 max-w-sm w-full relative overflow-hidden">
                {/* Decorative background blob */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                
                <div className="text-center mb-8 relative z-10">
                    <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200 text-white">
                        <i className="fas fa-shopping-basket text-2xl"></i>
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Minha Lista</h1>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Suas compras, simplificadas.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="space-y-1">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Seu melhor email" 
                            className="w-full px-5 py-3.5 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50 text-gray-800 font-medium placeholder-gray-400 transition-all"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sua senha" 
                            className="w-full px-5 py-3.5 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50 text-gray-800 font-medium placeholder-gray-400 transition-all"
                            required
                        />
                    </div>
                    
                    <button 
                        disabled={loading}
                        type="submit" 
                        className={`w-full text-white font-bold py-4 rounded-2xl transition-all shadow-lg transform active:scale-[0.98]
                            ${isLogin 
                                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-indigo-200' 
                                : 'bg-gradient-to-r from-teal-500 to-teal-600 shadow-teal-200'}`}
                    >
                        {loading ? <i className="fas fa-spinner fa-spin"></i> : (isLogin ? 'Entrar' : 'Criar Conta')}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6 relative z-10">
                    {isLogin ? "Ainda não tem conta? " : "Já possui cadastro? "}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
                    >
                        {isLogin ? 'Cadastre-se' : 'Entrar'}
                    </button>
                </p>
            </div>
        </div>
    );
};
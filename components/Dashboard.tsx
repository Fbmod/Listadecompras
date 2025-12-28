import React, { useState, useEffect, useRef } from 'react';
import { ShoppingList } from '../types';
import { createList, removeList, auth, updateProfile } from '../services/firebase';

interface DashboardProps {
    userId: string;
    lists: ShoppingList[];
    onSelectList: (listId: string) => void;
    onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userId, lists, onSelectList, onLogout }) => {
    const [newListName, setNewListName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    
    // User Name State
    const [displayName, setDisplayName] = useState('');

    // Delete Logic State
    const [pressingListId, setPressingListId] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(3);
    const intervalRef = useRef<any>(null);

    useEffect(() => {
        if (auth.currentUser?.displayName) {
            setDisplayName(auth.currentUser.displayName);
        }
    }, []);

    // Watch for countdown completion
    useEffect(() => {
        if (countdown === 0 && pressingListId) {
            performDelete(pressingListId);
        }
    }, [countdown, pressingListId]);

    const handleUpdateName = async () => {
        if (auth.currentUser && displayName.trim() !== auth.currentUser.displayName) {
            try {
                await updateProfile(auth.currentUser, { displayName: displayName.trim() });
            } catch (e) {
                console.error("Error updating profile", e);
            }
        }
    };

    const handleCreate = async () => {
        if (!newListName.trim()) return;
        setIsCreating(true);
        try {
            await createList(userId, newListName.trim());
            setNewListName('');
        } catch (e) {
            console.error(e);
            alert("Erro ao criar lista");
        } finally {
            setIsCreating(false);
        }
    };

    const startDelete = (e: React.MouseEvent | React.TouchEvent, listId: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Clear any existing timer just in case
        if (intervalRef.current) clearInterval(intervalRef.current);

        setPressingListId(listId);
        setCountdown(3);

        intervalRef.current = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
    };

    const cancelDelete = (e?: React.MouseEvent | React.TouchEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setPressingListId(null);
        setCountdown(3);
    };

    const performDelete = async (listId: string) => {
        // Stop timer
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setPressingListId(null);
        setCountdown(3);

        // Haptic feedback if available
        if (navigator.vibrate) navigator.vibrate(200);

        try {
            await removeList(userId, listId);
        } catch (error: any) {
            console.error("Erro ao deletar:", error);
            alert("Não foi possível apagar a lista: " + error.message);
        }
    };

    return (
        <div className="fade-in max-w-3xl mx-auto pb-20">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8 px-2 pt-4">
                <div className="flex-1 mr-4">
                    <p className="text-gray-500 font-medium text-xs mb-2 uppercase tracking-wider">Bem-vindo de volta,</p>
                    
                    {/* Campo de Nome Estilizado */}
                    <div className="relative group mb-1">
                        <input 
                            type="text" 
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            onBlur={handleUpdateName}
                            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                            placeholder="Digite seu nome..."
                            className="text-2xl font-extrabold text-gray-900 bg-transparent border-b-2 border-gray-200 hover:border-indigo-400 focus:border-indigo-600 focus:outline-none w-full max-w-[280px] transition-all placeholder-gray-300 py-1"
                        />
                        <i className="fas fa-pen text-xs text-gray-400 absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    
                    <p className="text-gray-400 text-sm mt-2">Suas <span className="font-bold text-indigo-500">Listas de Compras</span></p>
                </div>
                <button 
                    type="button"
                    onClick={onLogout}
                    className="bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-2xl transition shadow-sm border border-gray-100 shrink-0" 
                    title="Sair"
                >
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
            
            {/* Create List Input */}
            <div className="bg-white p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-10 flex gap-2 transition-transform focus-within:scale-[1.01]">
                <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <i className="fas fa-list-ul text-lg"></i>
                </div>
                <input 
                    type="text" 
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    placeholder="Criar nova lista..." 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 font-medium"
                    disabled={isCreating}
                />
                <button 
                    type="button"
                    onClick={handleCreate}
                    disabled={!newListName.trim() || isCreating}
                    className={`px-6 rounded-2xl font-bold text-white transition-all shadow-lg shadow-indigo-200
                        ${newListName.trim() 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 active:scale-95' 
                            : 'bg-gray-300 cursor-not-allowed'}`}
                >
                    {isCreating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-plus"></i>}
                </button>
            </div>

            {/* Grid of Lists */}
            <div className="grid gap-4 sm:grid-cols-2">
                {lists.map(list => {
                    const total = list.items?.length || 0;
                    const done = list.items?.filter(i => i.checked).length || 0;
                    const progress = total ? (done / total) * 100 : 0;
                    const isCompleted = total > 0 && done === total;
                    const isPressing = pressingListId === list.id;

                    return (
                        <div 
                            key={list.id}
                            className="group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 overflow-hidden"
                        >
                            {/* 1. DELETE BUTTON - Hold to delete */}
                            <div className="absolute top-0 right-0 p-3 z-[100]">
                                <button 
                                    type="button"
                                    // Mouse Events
                                    onMouseDown={(e) => startDelete(e, list.id)}
                                    onMouseUp={cancelDelete}
                                    onMouseLeave={cancelDelete}
                                    // Touch Events
                                    onTouchStart={(e) => startDelete(e, list.id)}
                                    onTouchEnd={cancelDelete}
                                    onTouchCancel={cancelDelete}
                                    // Prevent Context Menu on long press
                                    onContextMenu={(e) => e.preventDefault()}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 shadow-sm border cursor-pointer select-none
                                        ${isPressing 
                                            ? 'bg-red-500 border-red-500 text-white scale-110 shadow-md' 
                                            : 'bg-white border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200'
                                        }`}
                                    title="Segure para excluir"
                                >
                                    {isPressing ? (
                                        <span className="font-bold text-lg animate-pulse">{countdown}</span>
                                    ) : (
                                        <i className="fas fa-trash-alt text-sm pointer-events-none"></i>
                                    )}
                                </button>
                            </div>

                            {/* 2. CLICKABLE CARD CONTENT */}
                            <div 
                                onClick={() => onSelectList(list.id)}
                                className="p-5 pt-6 cursor-pointer h-full flex flex-col relative z-10"
                            >
                                {/* Gradient Line */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${isCompleted ? 'from-green-400 to-emerald-500' : 'from-indigo-400 to-purple-500'}`}></div>
                                
                                {/* Title */}
                                <h3 className={`font-bold text-lg truncate pr-10 mb-4 ${isCompleted ? 'text-gray-500 line-through decoration-green-300' : 'text-gray-800'}`}>
                                    {list.name}
                                </h3>

                                {/* Spacer */}
                                <div className="flex-1"></div>

                                {/* Stats */}
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Progresso</span>
                                    <span className={`text-sm font-bold ${isCompleted ? 'text-green-600' : 'text-indigo-600'}`}>
                                        {done}/{total} <span className="text-[10px] text-gray-400 font-normal">itens</span>
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-700 ease-out ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {lists.length === 0 && (
                <div className="text-center py-20 opacity-50">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <i className="fas fa-clipboard-list text-3xl"></i>
                    </div>
                    <p className="text-gray-400 font-medium">Nenhuma lista criada ainda.</p>
                </div>
            )}
        </div>
    );
};
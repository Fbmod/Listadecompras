import React, { useState } from 'react';
import { ShoppingList } from '../types';
import { createList, removeList } from '../services/firebase';

interface DashboardProps {
    userId: string;
    lists: ShoppingList[];
    onSelectList: (listId: string) => void;
    onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userId, lists, onSelectList, onLogout }) => {
    const [newListName, setNewListName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

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

    const handleDelete = async (e: React.MouseEvent, listId: string) => {
        // Standard React stopPropagation is sufficient and safer
        e.stopPropagation();

        if (window.confirm('Tem certeza que deseja apagar esta lista permanentemente?')) {
            try {
                await removeList(userId, listId);
            } catch (error: any) {
                console.error("Erro ao deletar:", error);
                alert("Não foi possível apagar a lista: " + error.message);
            }
        }
    };

    return (
        <div className="fade-in max-w-3xl mx-auto pb-20">
            {/* Header Section */}
            <div className="flex justify-between items-end mb-8 px-2 pt-4">
                <div>
                    <p className="text-gray-500 font-medium text-xs mb-1 uppercase tracking-wider">Bem-vindo de volta</p>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Suas <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Listas</span>
                    </h1>
                </div>
                <button 
                    type="button"
                    onClick={onLogout}
                    className="bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-2xl transition shadow-sm border border-gray-100" 
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

                    return (
                        <div 
                            key={list.id}
                            className="group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 overflow-hidden"
                        >
                            {/* 1. DELETE BUTTON - Highest Z-Index to ensure clickability */}
                            <div className="absolute top-0 right-0 p-3 z-[100]">
                                <button 
                                    type="button"
                                    onClick={(e) => handleDelete(e, list.id)}
                                    className="w-10 h-10 flex items-center justify-center bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-all duration-200 shadow-sm border border-gray-100 hover:border-red-200 cursor-pointer active:scale-90 hover:scale-110"
                                    title="Excluir Lista"
                                >
                                    <i className="fas fa-trash-alt text-sm pointer-events-none"></i>
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
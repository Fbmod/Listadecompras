import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ShoppingList, ShoppingItem } from '../types';
import { updateListItems, clearCheckedItems } from '../services/firebase';
import { parseItemsInput } from '../services/categoryService';

interface ShoppingListDetailProps {
    userId: string;
    list: ShoppingList;
    onBack: () => void;
    showToast: (msg: string) => void;
}

interface ItemRowProps {
    item: ShoppingItem;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onSavePrice: (id: string, price: number | null) => void;
    onRename: (id: string, newName: string) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ 
    item, 
    onToggle, 
    onDelete, 
    onSavePrice,
    onRename
}) => {
    // Price Editing State
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [priceInput, setPriceInput] = useState(item.price ? item.price.toString() : '');
    const priceInputRef = useRef<HTMLInputElement>(null);

    // Name Editing State
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameInput, setNameInput] = useState(item.name);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Focus effects
    useEffect(() => {
        if (isEditingPrice && priceInputRef.current) {
            priceInputRef.current.focus();
        }
    }, [isEditingPrice]);

    useEffect(() => {
        if (isEditingName && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [isEditingName]);

    // Price Handlers
    const handlePriceSave = () => {
        const val = parseFloat(priceInput.replace(',', '.'));
        const newPrice = isNaN(val) ? null : val;
        onSavePrice(item.id, newPrice);
        setIsEditingPrice(false);
    };

    const handlePriceKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handlePriceSave();
        if (e.key === 'Escape') {
            setPriceInput(item.price ? item.price.toString() : '');
            setIsEditingPrice(false);
        }
    };

    // Name Handlers
    const handleNameSave = () => {
        const trimmed = nameInput.trim();
        if (trimmed && trimmed !== item.name) {
            onRename(item.id, trimmed);
        } else {
            setNameInput(item.name); // Revert if empty
        }
        setIsEditingName(false);
    };

    const handleNameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleNameSave();
        if (e.key === 'Escape') {
            setNameInput(item.name);
            setIsEditingName(false);
        }
    };

    return (
        <div 
            className={`animate-slide-up group flex items-center justify-between p-3.5 rounded-2xl mb-2 transition-all duration-300 ${
                item.checked 
                    ? 'bg-gray-50/80 border border-transparent' 
                    : 'bg-white border border-gray-100 shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:border-indigo-200 hover:shadow-md'
            }`}
        >
            {/* Click Area: Toggle */}
            <div 
                onClick={() => !isEditingName && onToggle(item.id)}
                className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer select-none"
            >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    item.checked 
                        ? 'bg-green-500 border-green-500 scale-100' 
                        : 'border-2 border-gray-300 group-hover:border-indigo-400 bg-transparent scale-95 group-hover:scale-100'
                }`}>
                    {item.checked && <i className="fas fa-check text-white text-[10px]"></i>}
                </div>
                
                <div className="flex flex-col min-w-0 flex-1 relative">
                    {isEditingName ? (
                        <input
                            ref={nameInputRef}
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            onBlur={handleNameSave}
                            onKeyDown={handleNameKeyDown}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-white border border-indigo-300 rounded px-1 py-0.5 text-[15px] font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                    ) : (
                        <span 
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                                setIsEditingName(true);
                            }}
                            title="Clique duplo para editar"
                            className={`truncate font-medium text-[15px] transition-colors ${item.checked ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                        >
                            {item.name}
                        </span>
                    )}
                    
                    {!isEditingPrice && (
                        <span className={`text-xs font-bold h-5 flex items-center ${item.checked ? 'text-gray-300' : 'text-indigo-600'}`}>
                            {item.price ? `R$ ${item.price.toFixed(2)}` : <span className="text-gray-300 font-normal text-[10px]">Adicionar preço</span>}
                        </span>
                    )}

                    {isEditingPrice && (
                        <div className="flex items-center gap-1 mt-1" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs text-gray-500 font-bold">R$</span>
                            <input
                                ref={priceInputRef}
                                type="number"
                                step="0.01"
                                value={priceInput}
                                onChange={(e) => setPriceInput(e.target.value)}
                                onBlur={handlePriceSave}
                                onKeyDown={handlePriceKeyDown}
                                className="w-20 px-2 py-0.5 text-xs border border-indigo-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="0,00"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 pl-2">
                {!isEditingPrice && !isEditingName && (
                    <button 
                        type="button"
                        onClick={(e) => { 
                            e.stopPropagation();
                            setPriceInput(item.price ? item.price.toString() : ''); 
                            setIsEditingPrice(true); 
                        }}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${item.checked ? 'text-gray-200' : 'text-gray-300 hover:text-indigo-600 hover:bg-indigo-50'}`}
                    >
                        <i className="fas fa-dollar-sign text-sm pointer-events-none"></i>
                    </button>
                )}
                <button 
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }}
                    className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                    <i className="fas fa-times text-sm pointer-events-none"></i>
                </button>
            </div>
        </div>
    );
};

export const ShoppingListDetail: React.FC<ShoppingListDetailProps> = ({ userId, list, onBack, showToast }) => {
    const [inputValue, setInputValue] = useState('');
    const listEndRef = useRef<HTMLDivElement>(null);

    const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

    const handleAddItem = async () => {
        if (!inputValue.trim()) return;

        const parsed = parseItemsInput(inputValue);
        const newItems: ShoppingItem[] = parsed.map(p => ({
            id: generateId(),
            name: p.rawName.charAt(0).toUpperCase() + p.rawName.slice(1),
            category: p.category,
            price: null,
            checked: false
        }));

        const currentItems = list.items || [];
        const updatedList = [...newItems, ...currentItems];

        try {
            await updateListItems(userId, list.id, updatedList);
            setInputValue('');
            showToast(`${newItems.length} item(s) adicionado(s)!`);
        } catch (e: any) {
            console.error(e);
            alert("Erro ao adicionar: " + e.message);
        }
    };

    const actions = {
        toggle: async (id: string) => {
            const items = list.items || [];
            const updated = items.map(i => i.id === id ? { ...i, checked: !i.checked } : i);
            await updateListItems(userId, list.id, updated);
        },
        delete: async (id: string) => {
            const items = list.items || [];
            const updated = items.filter(i => i.id !== id);
            await updateListItems(userId, list.id, updated);
            showToast("Item removido");
        },
        savePrice: async (id: string, newPrice: number | null) => {
            const items = list.items || [];
            const updated = items.map(i => i.id === id ? { ...i, price: newPrice } : i);
            await updateListItems(userId, list.id, updated);
        },
        rename: async (id: string, newName: string) => {
            const items = list.items || [];
            const updated = items.map(i => i.id === id ? { ...i, name: newName } : i);
            await updateListItems(userId, list.id, updated);
        }
    };

    const handleClearChecked = async () => {
        const items = list.items || [];
        const hasChecked = items.some(i => i.checked);
        
        if (!hasChecked) return showToast("Nada para limpar.");

        try {
            await clearCheckedItems(userId, list.id, items);
            showToast("Itens removidos!");
        } catch (e: any) {
            console.error(e);
            alert("Erro: " + e.message);
        }
    };

    const handleRecipeSearch = () => {
        const items = list.items || [];
        const ingredients = items.filter(i => !i.checked).map(i => i.name).join(' ');
        if (!ingredients) return showToast("Lista vazia ou tudo comprado!");
        window.open(`https://www.google.com/search?q=receita+com+${encodeURIComponent(ingredients)}`, '_blank');
    };

    const { activeGroups, completedItems, totalEstimated } = useMemo(() => {
        const groups: Record<string, ShoppingItem[]> = {};
        const completed: ShoppingItem[] = [];
        const items = list.items || [];
        let total = 0;
        
        items.forEach(item => {
            if (item.checked) {
                if (item.price) total += Number(item.price);
                completed.push(item);
            } else {
                if (item.price) total += Number(item.price);
                const cat = item.category || 'Outros';
                if (!groups[cat]) groups[cat] = [];
                groups[cat].push(item);
            }
        });

        Object.keys(groups).forEach(key => groups[key].sort((a, b) => a.name.localeCompare(b.name)));
        completed.sort((a, b) => a.name.localeCompare(b.name));

        return { activeGroups: groups, completedItems: completed, totalEstimated: total };
    }, [list.items]);

    const sortedActiveCategories = Object.keys(activeGroups).sort((a, b) => 
        a === 'Outros' ? 1 : b === 'Outros' ? -1 : a.localeCompare(b)
    );

    return (
        <div className="fade-in max-w-3xl mx-auto flex flex-col h-[calc(100vh-2rem)] sm:h-auto sm:min-h-[85vh] relative">
            {/* Glass Header */}
            <div className="sticky top-0 z-30 pt-2 pb-4 px-1 bg-gradient-to-b from-[#f5f7fa] via-[#f5f7fa] to-transparent">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-2.5 rounded-2xl shadow-sm border border-white/50">
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-500 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 transition">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h1 className="text-lg font-extrabold flex-1 truncate text-gray-800">{list.name}</h1>
                    <button onClick={handleRecipeSearch} className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl hover:bg-amber-100 transition shadow-sm flex items-center justify-center" title="Ideias de Receitas">
                        <i className="fas fa-utensils"></i>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col px-1 pb-32 overflow-y-auto custom-scrollbar">
                {/* Modern Input Area */}
                <div className="bg-white p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-8 flex gap-2 items-center transition-all focus-within:shadow-[0_8px_30px_rgb(79,70,229,0.1)]">
                    <div className="pl-4 text-gray-400">
                        <i className="fas fa-plus"></i>
                    </div>
                    <textarea 
                        rows={1}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddItem(); } }}
                        placeholder="Adicionar item (ex: Arroz...)" 
                        className="flex-1 px-2 py-3 border-0 bg-transparent focus:ring-0 resize-none text-gray-800 placeholder-gray-400 font-medium"
                    />
                    <button 
                        type="button"
                        onClick={handleAddItem}
                        disabled={!inputValue.trim()}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-all ${inputValue.trim() ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-95' : 'bg-gray-200'}`}
                    >
                        <i className="fas fa-paper-plane text-sm"></i>
                    </button>
                </div>

                <div className="space-y-8">
                    {sortedActiveCategories.map(cat => (
                        <div key={cat} className="animate-fade-in">
                            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 pl-2">
                                {cat}
                                <div className="h-px bg-gray-200 flex-1 ml-2 opacity-50"></div>
                            </h3>
                            <div>
                                {activeGroups[cat].map(item => (
                                    <ItemRow 
                                        key={item.id} 
                                        item={item} 
                                        onToggle={actions.toggle} 
                                        onDelete={actions.delete}
                                        onSavePrice={actions.savePrice}
                                        onRename={actions.rename}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {completedItems.length > 0 && (
                    <div className="mt-10 animate-fade-in">
                         <div className="flex items-center gap-3 mb-4 pl-2">
                            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md uppercase tracking-wider border border-green-100">
                                Concluídos ({completedItems.length})
                            </span>
                            <div className="h-px bg-green-100/50 flex-1"></div>
                        </div>
                        <div className="opacity-60 grayscale-[30%]">
                            {completedItems.map(item => (
                                <ItemRow 
                                    key={item.id} 
                                    item={item} 
                                    onToggle={actions.toggle} 
                                    onDelete={actions.delete}
                                    onSavePrice={actions.savePrice}
                                    onRename={actions.rename}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {(list.items?.length || 0) === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 opacity-40">
                        <i className="fas fa-basket-shopping text-5xl text-gray-300 mb-4"></i>
                        <p className="font-medium text-gray-400">Lista vazia</p>
                    </div>
                )}
                
                <div ref={listEndRef}></div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="fixed bottom-6 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[600px] z-50">
                <div className="bg-gray-900/90 backdrop-blur-md text-white p-1.5 pl-5 pr-1.5 rounded-full shadow-2xl flex items-center justify-between border border-white/10">
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Total Estimado</span>
                        <div className="text-lg font-bold text-white leading-none">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalEstimated)}
                        </div>
                    </div>
                    
                    {completedItems.length > 0 && (
                        <button 
                            type="button"
                            onClick={handleClearChecked}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold h-10 px-5 rounded-full text-xs uppercase tracking-wide transition shadow-lg shadow-red-500/30 flex items-center gap-2"
                        >
                            <i className="fas fa-trash-can"></i> Limpar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
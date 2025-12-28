import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, subscribeLists } from './services/firebase';
import { User, ShoppingList, ViewState } from './types';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { ShoppingListDetail } from './components/ShoppingListDetail';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [view, setView] = useState<ViewState>('loading');
    const [lists, setLists] = useState<ShoppingList[]>([]);
    const [currentListId, setCurrentListId] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
                setView('dashboard');
            } else {
                setUser(null);
                setView('auth');
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) {
            setLists([]);
            return;
        }

        const unsubscribe = subscribeLists(user.uid, (data) => {
            setLists(data);
        });
        return () => unsubscribe();
    }, [user]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleSelectList = (listId: string) => {
        setCurrentListId(listId);
        setView('list');
    };

    const handleBack = () => {
        setCurrentListId(null);
        setView('dashboard');
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    // Render Logic
    if (view === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-500 font-medium">Carregando...</p>
                </div>
            </div>
        );
    }

    const currentList = lists.find(l => l.id === currentListId);

    return (
        <div className="flex items-start justify-center min-h-screen p-2 sm:p-4 text-gray-800">
            <div className="w-full max-w-2xl my-4">
                
                {view === 'auth' && <Auth />}
                
                {view === 'dashboard' && user && (
                    <Dashboard 
                        userId={user.uid} 
                        lists={lists} 
                        onSelectList={handleSelectList}
                        onLogout={handleLogout}
                    />
                )}

                {view === 'list' && user && currentList && (
                    <ShoppingListDetail 
                        userId={user.uid}
                        list={currentList}
                        onBack={handleBack}
                        showToast={showToast}
                    />
                )}

                {/* Toast Notification */}
                <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 whitespace-nowrap transition-all duration-300 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <i className="fas fa-check-circle text-green-400"></i>
                    <span className="font-medium">{toastMessage}</span>
                </div>
            </div>
        </div>
    );
};

export default App;
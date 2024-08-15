import {useContext} from "react";

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import DeliverymanPage from '../pages/DeliverymanPage';
import LoginPage from '../pages/LoginPage';
import OrdersPage from '../pages/OrdersPage';
import ProblemsPage from '../pages/ProblemsPage';
import RecipientsPage from '../pages/RecipientsPage';
import SupportPage from "../pages/SupportPage";

import AuthContext from "../contexts/auth";

import ProtectedRoute from "./protectedRoute";

export default function RoutesComponent(){
    const {signed, loading} = useContext(AuthContext);

    if(loading){
        return <p>carregando</p>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ signed ? (
                            <Navigate to="/encomendas" />
                        ) : (
                            <LoginPage />
                        )}/>
                <Route path="/encomendas" element={
                    <ProtectedRoute>
                        <OrdersPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/entregadores" element={
                    <ProtectedRoute>
                        <DeliverymanPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/destinatarios" element={
                    <ProtectedRoute>
                        <RecipientsPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/problemas" element={
                    <ProtectedRoute>
                        <ProblemsPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/suporte" element={
                    <ProtectedRoute>
                        <SupportPage/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import DeliverymanPage from '../pages/DeliverymanPage';
import LoginPage from '../pages/LoginPage';
import OrdersPage from '../pages/OrdersPage';
import ProblemsPage from '../pages/ProblemsPage';
import RecipientsPage from '../pages/RecipientsPage';

export default function RoutesComponent(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/encomendas" element={<OrdersPage/>}/>
                <Route path="/entregadores" element={<DeliverymanPage/>}/>
                <Route path="/destinatarios" element={<RecipientsPage/>}/>
                <Route path="/problemas" element={<ProblemsPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
import NotificationButton from '../NotificationButton';
import './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Sale } from '../../models/sale';


export default function SalesCard() {

    const [dataMin, setDataMin] = useState(new Date());
    const [dataMax, setDataMax] = useState(new Date());

    const [sales, setSales] = useState<Sale[]>([])

    useEffect(() => {
        axios.get('https://dsmeta-victormreis.herokuapp.com/sales').then(resp => {
            setSales(resp.data.content)
        })
    }, [])


    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={dataMin}
                        onChange={(date: Date) => setDataMin(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={dataMax}
                        onChange={(date: Date) => setDataMax(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => (
                            <tr key={sale.id}>
                                <td className="show992">{sale.id}</td>
                                <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                <td>{sale.sellerName}</td>
                                <td className="show992">{sale.visited}</td>
                                <td className="show992">{sale.deals}</td>
                                <td>R$ {sale.amount.toFixed(2)}</td>
                                <td>
                                    <div className="dsmeta-red-btn-container">
                                        <NotificationButton />
                                    </div>
                                </td>
                            </tr>

                        ))}
                        
                    </tbody>

                </table>
            </div>

        </div>
    )
}
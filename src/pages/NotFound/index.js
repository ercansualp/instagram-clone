import {Link} from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{display: "flex", flexDirection: "column", padding: 40, alignItems: "center"}}>
            <span style={{fontSize: 24, fontWeight: 600}}>Üzgünüz, bu sayfaya ulaşılamıyor.</span>
            <span style={{marginTop: 40, fontSize: 16, fontWeight: 400}}>Tıkladığın bağlantı bozuk olabilir veya sayfa kaldırılmış olabilir. <Link
                to="/" style={{color: "rgb(0, 55, 107)"}}>Instagram'a geri dön.</Link></span>
        </div>
    )
}
import {useState} from "react";
import {Register as SignUp} from '../../firebase';
import * as Component from './styled-components';
import {useNavigate} from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({email: "", password: "", name: null, username: ""});

    const showPswd = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleChange = e => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: (value !== null && value !== "" && value !== undefined) ? value : null
        });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await SignUp(formData);
        if(response) {
            navigate("/", {replace:true});
        }
    }

    return (
        <Component.Container>
            <Component.Content>
                <Component.LoginForm>
                    <Component.LoginFormContent>
                        <Component.InstagramLogo/>
                        <Component.FormInputs>
                            <Component.FormInput type="email" placeholder="E-posta" maxLength="30" name="email"
                                                 value={formData.email} onChange={handleChange}/>
                            <Component.FormInput type="text" placeholder="Adı Soyadı" maxLength="30" name="name"
                                                 value={formData.name} onChange={handleChange}/>
                            <Component.FormInput type="text" placeholder="Kullanıcı adı" maxLength="30" name="username"
                                                 value={formData.username} onChange={handleChange}/>
                            <div style={{position: "relative"}}>
                                <Component.FormInput type={showPassword ? "text" : "password"} placeholder="Şifre"
                                                     maxLength="30"
                                                     name="password" value={formData.password} onChange={handleChange}/>
                                <Component.ShowPasswordButton onClick={showPswd}>Göster</Component.ShowPasswordButton>
                            </div>
                            <Component.LoginButton type="submit" value="Kaydol" onClick={handleSubmit}/>
                        </Component.FormInputs>
                        <Component.RegisterInstagram>
                            <span>Hesabın var mı?</span>
                            <Component.RegisterInstagramButton to="/login">Giriş yap</Component.RegisterInstagramButton>
                        </Component.RegisterInstagram>
                    </Component.LoginFormContent>
                </Component.LoginForm>
            </Component.Content>
        </Component.Container>
    )
}
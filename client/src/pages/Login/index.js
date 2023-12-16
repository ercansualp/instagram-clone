import {useState} from "react";
import {Login as SignIn} from '../../firebase';
import * as Component from './styled-components';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({email: "", password: ""});

    const showPswd = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const {data} = await SignIn(formData.email, formData.password);
        if(!data) {

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
                            <div style={{position: "relative"}}>
                                <Component.FormInput type={showPassword ? "text" : "password"} placeholder="Şifre"
                                                     maxLength="30"
                                                     name="password" value={formData.password} onChange={handleChange}/>
                                <Component.ShowPasswordButton onClick={showPswd}>Göster</Component.ShowPasswordButton>
                            </div>
                            <Component.LoginButton type="submit" value="Giriş yap" onClick={handleSubmit}/>
                        </Component.FormInputs>
                        <Component.ForgotPassword to="/login">Şifreni mi unuttun?</Component.ForgotPassword>
                        <Component.RegisterInstagram>
                            <span>Hesabın yok mu?</span>
                            <Component.RegisterInstagramButton to="/register">Kaydol</Component.RegisterInstagramButton>
                        </Component.RegisterInstagram>
                    </Component.LoginFormContent>
                </Component.LoginForm>
            </Component.Content>
        </Component.Container>
    )
}
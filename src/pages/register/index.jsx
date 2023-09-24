import { Link } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/layoutscomponents";
import register from "../../assets/cadastro.png"
import { apiUser } from "../../services/api";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSaveUser = async (e) => {
        e.preventDefault();
        const data = {
            email, password, name
        }

        const response = await apiUser.post("/user/creates", data)
        console.log(response.data);
    };

    return (
    <LayoutComponents>
   <form onSubmit={handleSaveUser} className="login-form">
            <span className="title-form"> Criar Conta </span>

            <span className="title-form">
                <img src={register} alt="Desenho de estoque" />
            </span>

            <div className="wrap-input">
                <input
                    className={name !== "" ? "has-val input" : "input"}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Nome"></span>
            </div>

            <div className="wrap-input">
                <input
                    className={email !== "" ? "has-val input" : "input"}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
                <input
                    className={password !== "" ? "has-val input" : "input"}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
                <button type="submit" className="login-form-btn">Cadastrar</button>
            </div>

            <div className="text-center">
                <span className="txt1">Já possui conta? </span>
                <Link className="txt2" to="/">
                    Acessar com email e senha.
                </Link>
            </div>
        </form>
    </LayoutComponents>
    );
}
import React from "react";
import Header from "./Header";
import * as S from "./Main.styles"

const Main: React.FC = () => {
    return (
        <S.Wrapper>
            <Header />
            <main className={S.Container}>
                <h1>Welcome to Our Website</h1>
                <p>Explore and enjoy our services.</p>
            </main>
        </S.Wrapper>
    );
};

export default Main;

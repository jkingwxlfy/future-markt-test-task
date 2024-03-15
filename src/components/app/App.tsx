import { useState, useEffect } from 'react';

import Header from '../header/Header';
import Form from '../form/Form';

import Mentor from '../../img/mentor.png';
import BlueArrow from '../../img/blue-arrow.png';
import WhiteArrow from '../../img/white-arrow.png';

import './app.scss';

const App: React.FC = () => {
    const [isOpenedForm, setIsOpenedForm] = useState(false);
    const [gbp, setGbp] = useState<number | null>(null);
    const [sumDate, setSumDate] = useState(0);

    const handleForm = (value: boolean) => {
        setIsOpenedForm(value);
    };

    const calculateDateSum = (): number => {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const digits = dateString.replace(/\D/g, '');
        const sum = digits
            .split('')
            .reduce((acc, value) => acc + parseInt(value, 10), 0);
        return sum;
    };

    useEffect(() => {
        setSumDate(calculateDateSum());

        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((response) => response.json())
            .then((data) => {
                const gbpRate = Math.round(data.Valute.GBP.Value);
                setGbp(gbpRate);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных: ', error);
            });
    }, []);

    return (
        <main className="app">
            <div className="app__background" />
            <div className="app__container">
                <Header />
                <Form isOpened={isOpenedForm} setIsOpened={setIsOpenedForm} />
                <div className="app__promo">
                    <div className="app__promo-info">
                        <div className="app__promo-title">
                            Создаю условия для вашего успеха
                        </div>
                        <div className="app__promo-description">
                            Когда ваше время и энергия лучше сфокусированы,
                            стремление к новым возможностям становится
                            реальностью, ваш успех зависит от ваших действий
                        </div>
                        <div className="app__buttons">
                            <div
                                className="app__buttons-item"
                                tabIndex={1}
                                onClick={() => handleForm(true)}
                            >
                                <div className="app__buttons-item__name">
                                    Записаться на консультацию
                                </div>
                                <div className="app__buttons-item__arrow">
                                    <img
                                        src={BlueArrow}
                                        alt="arrow of button"
                                    />
                                </div>
                            </div>
                            <div
                                className="app__buttons-item transparent"
                                tabIndex={1}
                                onClick={() => handleForm(true)}
                            >
                                <div className="app__buttons-item__name">
                                    Бесплатная консультация
                                </div>
                                <div className="app__buttons-item__arrow transparent">
                                    <img
                                        src={WhiteArrow}
                                        alt="arrow of button"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="app__promo-counters">
                            <div className="app__promo-counters__item">
                                <div className="app__promo-counters__item-count">
                                    {`${sumDate}+`}
                                </div>
                                <div className="app__promo-counters__item-description">
                                    техник для достижения целей
                                </div>
                            </div>
                            <div className="app__promo-counters__item">
                                <div className="app__promo-counters__item-count">
                                    {`${gbp && gbp}%`}
                                </div>
                                <div className="app__promo-counters__item-description">
                                    увеличение личной продуктивности
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="app__promo-image">
                        <img src={Mentor} alt="image of mentor" />
                    </div>
                </div>
            </div>
        </main>
    );
};
export default App;

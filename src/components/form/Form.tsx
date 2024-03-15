import { useState, useEffect } from 'react';

import Cross from '../../img/cross.png';
import WhiteArrow from '../../img/white-arrow.png';

import './form.scss';

interface IFormProps {
    isOpened: boolean;
    setIsOpened: (value: boolean) => void;
}

const Form: React.FC<IFormProps> = ({ isOpened, setIsOpened }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onCloseForm = () => {
        setIsOpened(false);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (name.length <= 3 || number.length <= 3) {
            setMessage('Заполните все поля');
            return;
        }

        localStorage.setItem('name', name);
        localStorage.setItem('number', number);
        setMessage('');
        setName('');
        setNumber('');
        setIsSuccess(true);
    };

    // useEffect здесь для того, чтобы без мерцания очистить поля и сообщение, когда пользователь закроет форму
    useEffect(() => {
        if (isOpened) {
            setMessage('');
            setName('');
            setNumber('');
            setIsChecked(false);
            setIsSuccess(false);
        }
    }, [isOpened]);

    return (
        <section
            className={`form ${isOpened ? 'active' : ''}`}
            onClick={onCloseForm}
        >
            <form
                className="form__wrapper"
                onClick={(event) => event.stopPropagation()}
                onSubmit={onSubmit}
            >
                {!isSuccess ? (
                    <div className="form__content">
                        <div
                            className="form__close"
                            tabIndex={1}
                            onClick={onCloseForm}
                        >
                            <img src={Cross} alt="button for closing modal" />
                        </div>
                        <div className="form__title">
                            Закажите обратный звонок
                        </div>
                        <input
                            type="text"
                            className="form__field"
                            placeholder="Имя"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <input
                            type="text"
                            className="form__field"
                            placeholder="Телефон"
                            value={number}
                            onChange={(event) => setNumber(event.target.value)}
                        />
                        <div className="form__field-message">
                            {message ? message : ''}
                        </div>
                        <label className="form__checkbox">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(event) =>
                                    setIsChecked(event.target.checked)
                                }
                            />
                            <span />
                            <p>
                                Согласен на сохранение и обработку персональных
                                данных
                            </p>
                        </label>
                        <button
                            className="app__buttons-item transparent"
                            tabIndex={1}
                            type="submit"
                        >
                            <div className="app__buttons-item__name">
                                Бесплатная консультация
                            </div>
                            <div className="app__buttons-item__arrow transparent">
                                <img src={WhiteArrow} alt="arrow of button" />
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="form__success">
                        <div
                            className="form__close"
                            tabIndex={1}
                            onClick={onCloseForm}
                        >
                            <img src={Cross} alt="button for closing modal" />
                        </div>
                        <div className="form__success-title">
                            Спасибо за заявку
                        </div>
                        <div className="form__success-description">
                            Я обязательно свяжусь с вами в ближайшее время.
                        </div>
                        <div className="form__success-author">
                            Alex.Shevtsov
                        </div>
                    </div>
                )}
            </form>
        </section>
    );
};
export default Form;

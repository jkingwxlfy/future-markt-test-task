import Phone from '../../img/phone.png';
import './header.scss';

const links = [
    'Обо мне',
    'Наставничество',
    'Мероприятия',
    'Кейсы',
    'Отзывы',
    'Контакты',
];

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__title">Alex.Shevtsov</div>
            <div className="header__links">
                {links.map((link) => (
                    <div className="header__links-item" key={link} tabIndex={1}>
                        {link}
                    </div>
                ))}
            </div>
            <div className="header__contacts">
                <div className="header__contacts-image">
                    <img src={Phone} alt="the image of phone logo" />
                </div>
                <div className="header__contacts-number">8-345-123-34-45</div>
            </div>
        </header>
    );
};
export default Header;

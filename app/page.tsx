'use client';

import { useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, Bell, Check, ChevronDown, CircleHelp,
  Compass, Gift, Heart, ImagePlus, LockKeyhole, MessageCircle, MoreHorizontal,
  Paperclip, Phone, Search, Send, Settings2, ShieldCheck, Smile, Sparkles,
  Video, X,
} from 'lucide-react';

const profiles = [
  { name: 'Софія', age: 24, city: 'Львів', distance: '3 км', bio: 'Люблю довгі прогулянки, камерні концерти й людей, з якими можна говорити про все.', tags: ['Мистецтво', 'Подорожі', 'Кава'], image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=960&q=85', online: true },
  { name: 'Марко', age: 27, city: 'Київ', distance: '8 км', bio: 'Знімаю на плівку, шукаю нові маршрути та найкращий раф у місті.', tags: ['Фото', 'Мандри', 'Кіно'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=960&q=85', online: true },
  { name: 'Аліна', age: 25, city: 'Львів', distance: '5 км', bio: 'Море, книжки й спонтанні поїздки на вихідні. Розкажи про своє місце сили.', tags: ['Море', 'Книги', 'Йога'], image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=960&q=85', online: false },
];
const chats = [
  { name: 'Софія', text: 'Ти вже була в тому новому місці?', time: 'зараз', image: profiles[0].image, unread: 2, online: true },
  { name: 'Марко', text: 'Надіслав фото з Карпат 📷', time: '12 хв', image: profiles[1].image, unread: 0, online: true },
  { name: 'Аліна', text: 'Дякую за рекомендацію!', time: '1 год', image: profiles[2].image, unread: 0, online: false },
];

export default function Home() {
  const [section, setSection] = useState('Знайомства');
  const [profileIndex, setProfileIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [notice, setNotice] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [showGift, setShowGift] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [activeChat, setActiveChat] = useState('Софія');
  const profile = profiles[profileIndex % profiles.length];
  const say = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(''), 2800); };
  const nextProfile = (isLike: boolean) => {
    setLiked(isLike);
    if (isLike) say(`Вподобання надіслано профілю ${profile.name} 💜`);
    window.setTimeout(() => { setProfileIndex((n) => (n + 1) % profiles.length); setLiked(false); }, 250);
  };
  const sendMessage = () => {
    if (!message.trim()) return;
    setSentMessages((all) => [...all, message.trim()]); setMessage('');
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" onClick={() => setSection('Знайомства')}><span className="brand-mark"><Heart size={20} fill="currentColor" /></span><span>nevidimka<span className="brand-dot">.</span></span></a>
        <button className="profile-mini" onClick={() => say('Налаштування профілю скоро будуть доступні')}><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Ваш профіль"/><span className="profile-mini-text"><b>Віктор</b><small><span className="online-dot"/> Профіль заповнено на 80%</small></span><ChevronDown size={16}/></button>
        <div className="nav-label">МЕНЮ</div>
        <nav className="main-nav">
          <button className={section === 'Знайомства' ? 'nav-item active' : 'nav-item'} onClick={() => setSection('Знайомства')}><Compass size={19}/>Знайомства</button>
          <button className={section === 'Повідомлення' ? 'nav-item active' : 'nav-item'} onClick={() => setSection('Повідомлення')}><MessageCircle size={19}/>Повідомлення<span className="nav-count">2</span></button>
          <button className={section === 'Вподобання' ? 'nav-item active' : 'nav-item'} onClick={() => setSection('Вподобання')}><Heart size={19}/>Вподобання<span className="nav-count pale">4</span></button>
        </nav>
        <div className="nav-label discovery-label">ТВОЄ ВІДКРИТТЯ</div>
        <button className="nav-item" onClick={() => setShowGift(true)}><Gift size={19}/>Подарунки</button>
        <button className="nav-item" onClick={() => setShowSafety(true)}><ShieldCheck size={19}/>Безпека</button>
        <div className="sidebar-bottom"><div className="premium-card"><div className="premium-icon"><Sparkles size={18}/></div><b>Більше щирих зустрічей</b><p>Відкрий більше можливостей для знайомств.</p><button onClick={() => say('Підписки та підтримка проєкту скоро з’являться')}>Дізнатись більше <ArrowRight size={14}/></button></div><button className="nav-item settings-link" onClick={() => say('Налаштування скоро будуть доступні')}><Settings2 size={18}/>Налаштування</button><div className="sidebar-foot">© 2025 Nevidimka · <button onClick={() => setShowSafety(true)}>Правила безпеки</button></div></div>
      </aside>

      <section className="main-area">
        <header className="topbar"><div className="mobile-brand"><span className="brand-mark"><Heart size={17} fill="currentColor"/></span> nevidimka<span className="brand-dot">.</span></div><div className="breadcrumb">Головна <span>/</span> <b>{section}</b></div><div className="top-actions"><button className="icon-button" aria-label="Пошук" onClick={() => say('Пошук людей скоро буде доступний')}><Search size={19}/></button><button className="icon-button notification" aria-label="Сповіщення" onClick={() => say('Поки що нових сповіщень немає')}><Bell size={19}/><i/></button><div className="top-divider"/><button className="avatar-button" onClick={() => say('Ваш профіль')}><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Профіль"/><ChevronDown size={14}/></button></div></header>

        {section === 'Знайомства' && <div className="content discover-content"><div className="page-heading"><div><div className="eyebrow"><Sparkles size={14}/> ТВОЯ НАСТУПНА ІСТОРІЯ ПОЧИНАЄТЬСЯ ТУТ</div><h1>Знайомся <span>по-справжньому.</span></h1><p>Не свайп заради свайпу — а люди, з якими є про що говорити.</p></div><button className="filter-button" onClick={() => say('Фільтри пошуку скоро будуть доступні')}><Settings2 size={17}/>Фільтри</button></div>
          <div className="discover-layout"><div className="feature-card"><div className="photo-wrap"><img className="feature-photo" src={profile.image} alt={`Профіль: ${profile.name}`} key={profile.image}/><div className="photo-shade"/><div className="photo-top"><span className="verified"><Check size={12}/> Перевірений профіль</span><button className="photo-more" onClick={() => say('Профіль можна поскаржитись через меню')}><MoreHorizontal size={21}/></button></div><div className="photo-caption"><div className="location"><span className={profile.online ? 'online-dot' : 'offline-dot'}/>{profile.online ? 'Зараз онлайн' : 'Була нещодавно'} <span>·</span> {profile.distance} від тебе</div><h2>{profile.name}, {profile.age} <span className="verified-check"><Check size={12}/></span></h2><div className="place">{profile.city}, Україна</div></div><div className="photo-controls"><button className="pass-button" aria-label="Пропустити" onClick={() => nextProfile(false)}><X size={23}/></button><button className={liked ? 'like-button liked' : 'like-button'} aria-label="Вподобати" onClick={() => nextProfile(true)}><Heart size={23} fill="currentColor"/></button><button className="super-button" aria-label="Суперсимпатія" onClick={() => say('Суперсимпатію надіслано ✨')}><Sparkles size={20}/></button></div><div className="photo-pagination"><i className="current"/><i/><i/><i/><i/></div></div></div>
            <div className="profile-details"><div className="detail-top"><span className="section-kicker">ТРОХИ ПРО НЕЇ</span><button className="round-more" onClick={() => say('Додаткові дії')}><MoreHorizontal size={18}/></button></div><p className="bio">{profile.bio}</p><div className="tags">{profile.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="prompt-card"><span className="prompt-icon"><Sparkles size={16}/></span><div><small>ПИТАННЯ ДЛЯ ЗНАЙОМСТВА</small><p>Який день ти хотів(ла) б прожити ще раз?</p></div></div><div className="compatibility"><div className="compat-icon"><Heart size={17}/></div><div><b>Схожі інтереси</b><small>Вам обом подобаються подорожі</small></div><span className="compat-percent">84%</span></div><div className="detail-actions"><button className="message-profile" onClick={() => {setActiveChat(profile.name);setSection('Повідомлення')}}><MessageCircle size={17}/>Написати</button><button className="gift-profile" aria-label="Надіслати подарунок" onClick={() => setShowGift(true)}><Gift size={18}/></button></div><div className="safety-note"><LockKeyhole size={14}/><span>Твої дані та приватність під захистом</span></div></div>
          </div>
          <div className="under-card"><span>Кожне знайомство починається з поваги.</span><button onClick={() => setShowSafety(true)}>Наші правила спільноти <ArrowRight size={14}/></button></div>
        </div>}

        {section === 'Повідомлення' && <div className="content messages-page"><div className="page-heading message-heading"><div><div className="eyebrow"><MessageCircle size={14}/> ТВОЇ РОЗМОВИ</div><h1>Повідомлення<span>.</span></h1><p>Найкращі знайомства продовжуються тут.</p></div><button className="filter-button" onClick={() => say('Пошук у повідомленнях скоро буде доступний')}><Search size={17}/>Пошук</button></div><div className="chat-layout"><div className="chat-list"><div className="chat-list-head"><b>Усі чати</b><button onClick={() => say('Тут показані всі активні розмови')}><MoreHorizontal size={18}/></button></div>{chats.map((chat) => <button key={chat.name} className={activeChat === chat.name ? 'chat-row selected' : 'chat-row'} onClick={() => setActiveChat(chat.name)}><div className="chat-avatar"><img src={chat.image} alt=""/>{chat.online && <i/>}</div><div className="chat-row-copy"><div><b>{chat.name}</b><small>{chat.time}</small></div><p>{chat.text}</p></div>{chat.unread > 0 && <span className="unread">{chat.unread}</span>}</button>)}</div><div className="chat-window"><div className="chat-head"><div className="chat-head-person"><div className="chat-avatar"><img src={chats.find((c) => c.name === activeChat)?.image ?? profiles[0].image} alt=""/><i/></div><div><b>{activeChat}</b><small><span className="online-dot"/> Онлайн</small></div></div><div className="chat-head-actions"><button aria-label="Відеодзвінок" onClick={() => say('Відеодзвінки будуть доступні після підключення захищеного сервісу')}><Video size={18}/></button><button aria-label="Аудіодзвінок" onClick={() => say('Дзвінки будуть доступні після підключення сервісу')}><Phone size={17}/></button><button aria-label="Інформація про чат" onClick={() => setShowSafety(true)}><MoreHorizontal size={19}/></button></div></div><div className="chat-messages"><div className="date-divider"><span/>СЬОГОДНІ<span/></div><div className="bubble received">Привіт! Рада, що ми познайомились 😊<small>14:32</small></div><div className="bubble sent">Привіт! Взаємно. Як проходить твій день?<small>14:34 <Check size={12}/></small></div><div className="bubble received">Чудово! Знайшла нову затишну кав’ярню. Ти вже була в тому новому місці?<small>14:36</small></div>{sentMessages.map((text, i) => <div className="bubble sent" key={`${i}-${text}`}>{text}<small>щойно <Check size={12}/></small></div>)}</div><div className="chat-compose"><button aria-label="Додати вкладення" onClick={() => say('Додавання медіа буде доступне у повній версії')}><Paperclip size={18}/></button><button aria-label="Надіслати фото" onClick={() => say('Обмін фото буде доступний у повній версії')}><ImagePlus size={18}/></button><input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Напиши повідомлення..."/><button aria-label="Емодзі" onClick={() => setMessage((m) => m + ' 😊')}><Smile size={18}/></button><button className="send-button" aria-label="Надіслати" onClick={sendMessage}><Send size={17}/></button></div></div></div><p className="demo-caption"><LockKeyhole size={14}/> Демоверсія інтерфейсу: повідомлення ще не зберігаються на сервері.</p></div>}

        {section === 'Вподобання' && <div className="content likes-page"><div className="eyebrow"><Heart size={14}/> ВЗАЄМНА СИМПАТІЯ</div><h1>Вподобання<span>.</span></h1><p>Люди, яким ти сподобався. Тут усе починається з одного привітання.</p><div className="likes-empty"><div className="empty-heart"><Heart size={34}/></div><h2>Твоя історія ще пишеться</h2><p>Завітай трохи згодом — тут з’являться нові симпатії.</p><button onClick={() => setSection('Знайомства')}><Compass size={17}/>До знайомств</button></div></div>}
      </section>

      <aside className="right-rail"><div className="rail-heading"><div><span className="rail-eyebrow">ТВОЄ КОЛО</span><h3>На зв’язку <span>зараз</span></h3></div><button aria-label="Усі чати" onClick={() => setSection('Повідомлення')}><ArrowRight size={17}/></button></div><div className="online-list">{chats.filter((c) => c.online).map((chat) => <button className="online-person" key={chat.name} onClick={() => {setActiveChat(chat.name);setSection('Повідомлення')}}><div className="online-avatar"><img src={chat.image} alt=""/><i/></div><span><b>{chat.name}</b><small>Можна поговорити</small></span><MessageCircle size={17}/></button>)}</div><div className="rail-separator"/><div className="rail-tip"><div className="tip-icon"><ShieldCheck size={17}/></div><div><b>Знайомся безпечно</b><p>Не поспішай ділитися особистими даними. Довіряй своїм відчуттям.</p><button onClick={() => setShowSafety(true)}>Поради з безпеки <ArrowRight size={13}/></button></div></div><div className="rail-gift"><div className="gift-art"><Gift size={23}/><Sparkles size={14}/></div><div><b>Додай тепла до розмови</b><p>Маленький знак уваги може сказати багато.</p><button onClick={() => setShowGift(true)}>Обрати подарунок <ArrowRight size={13}/></button></div></div><div className="rail-footer">Зроблено з турботою в Україні <span>💜</span></div></aside>
      {notice && <div className="toast"><Check size={16}/>{notice}</div>}
      {showGift && <div className="modal-backdrop" onClick={() => setShowGift(false)}><section className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowGift(false)}><X size={18}/></button><div className="modal-icon gift-modal-icon"><Gift size={24}/></div><div className="eyebrow">МАЛЕНЬКИЙ ЗНАК УВАГИ</div><h2>Надішли подарунок</h2><p>Подарунки та донати поки не підключені. Жодні платежі не приймаються — це лише макет майбутньої функції.</p><div className="gift-options"><button onClick={() => say('Квіти — скоро в каталозі 🌷')}>🌷<small>Квіти</small></button><button onClick={() => say('Кава — скоро в каталозі ☕')}>☕<small>Кава</small></button><button onClick={() => say('Зірочка — скоро в каталозі ⭐')}>⭐<small>Зірочка</small></button></div><button className="modal-primary" onClick={() => setShowGift(false)}>Зрозуміло</button></section></div>}
      {showSafety && <div className="modal-backdrop" onClick={() => setShowSafety(false)}><section className="modal safety-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowSafety(false)}><X size={18}/></button><div className="modal-icon"><ShieldCheck size={24}/></div><div className="eyebrow">БЕЗПЕКА ТА ДОВІРА</div><h2>Знайомся з повагою</h2><p>Nevidimka — сервіс знайомств виключно для повнолітніх (18+). Не надсилай гроші незнайомцям, бережи адресу й особисті дані та повідомляй про підозрілу поведінку.</p><div className="safety-rules"><div><Check size={16}/>Зустрічайся вперше в публічному місці</div><div><Check size={16}/>Не надсилай інтимні матеріали під тиском</div><div><Check size={16}/>Заблокуй і поскаржся, якщо почуваєшся небезпечно</div></div><div className="minor-note"><LockKeyhole size={16}/><span>Сервіс не призначений для дітей і підлітків. Ми не створюємо для неповнолітніх кімнат знайомств, приватних чатів, відеодзвінків або обміну медіа.</span></div><button className="modal-primary" onClick={() => setShowSafety(false)}>Зрозуміло</button></section></div>}
    </main>
  );
}

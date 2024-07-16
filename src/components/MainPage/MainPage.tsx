import { FC } from "react"
import mainPage from "./mainPage.module.css"
import arrow from "../../assets/Arrow.png"
import space from "../../assets/Space.png"
import { Link } from "react-router-dom"

const MainPage:FC = () => {

  const templates = [
  {name: "Первичный осмотр (амбулатория)", component: "/ambulatePage"},
  {name: "Вторичный осмотр", component: "/"},
  {name: "Третичный осмотр", component: "/"},
  ]

  return (
    <div className={mainPage.body}>
      <div className={mainPage.header}>
        Выберите шаблон листа осмотра:
      </div>
      <div className={mainPage.content}>
        {templates.map((item) => 
          <div className={mainPage.content_item}>
            <Link to={item.component} className={mainPage.content_link}>
                {item.name}
            </Link>
          </div>
        )}
      </div>
      <div className={mainPage.footer}>
        <div className={mainPage.footer_item}>
          Для <span className={mainPage.footer_span}>&nbsp;ПЕРЕМЕЩЕНИЯ МЕЖДУ СТРОКАМИ&nbsp;</span> используйте клавиши &nbsp;<div className={mainPage.arrowImgDiv}><img src={arrow} /></div>&nbsp; и &nbsp;<div className={mainPage.arrowImgDiv}><img src={arrow} className={mainPage.arrowTransformed}/></div>
        </div>
        <div className={mainPage.footer_item}>
          Для <span className={mainPage.footer_span}>&nbsp;ВЫБОРА СТРОКИ&nbsp;</span> нажмите клавишу &nbsp;<div className={mainPage.enterImgDiv}><img src={space} />&nbsp;&nbsp;ENTER</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

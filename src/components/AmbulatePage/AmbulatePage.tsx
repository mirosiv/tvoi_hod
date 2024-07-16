import { FC, useEffect, useState } from "react";
import ambulatePage from "./ambulatePage.module.css"
import microphone from "../../assets/Microphone.png"
import microphoneDiactivated from "../../assets/MicrophoneDeactivated.png"

const AmbulatePage: FC = () => {

    const [value, setValue] = useState<any>({strings:[]})
    const [selectedField, setSelectedField] = useState(0)
    const [micActive, setMicActive] = useState(false)
    
    window.SpeechRecognition = window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true

    const handlerKeyPress = (e: any) =>{
        if (e.code === "Enter" && selectedField !== 0){
            setMicActive(!micActive)
        }else if (e.code === "ArrowDown"){
            e.preventDefault()
            let accessedElement = null
            let lostElement = null
            if (selectedField < inputNames.length){
                accessedElement = document.querySelector(`[data-key="${selectedField + 1}"]`)
                lostElement = document.querySelector(`[data-key="${selectedField}"]`)
                setSelectedField(prevState => prevState + 1)
            }else{
                accessedElement = document.querySelector(`[data-key="${selectedField}"]`)
            }
            if (accessedElement != null){
                accessedElement.className = `${ambulatePage.section_item_field} ${ambulatePage.section_item_field_active}`
                let headerOffset = 180;
                let elementPosition = accessedElement.getBoundingClientRect().top;
                let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            if (lostElement != null){
                lostElement.className = `${ambulatePage.section_item_field}`
            }   
        }else if (e.code === "ArrowUp"){
            e.preventDefault()
            let accessedElement = null
            let lostElement = null
            if (selectedField === 1){
                accessedElement = document.querySelector(`[data-key="${selectedField}"]`)
            }else if (selectedField === 0){
                accessedElement = document.querySelector(`[data-key="${selectedField + 1}"]`)
                setSelectedField(prevState => prevState + 1)
            }
            else{
                accessedElement = document.querySelector(`[data-key="${selectedField - 1}"]`)
                lostElement = document.querySelector(`[data-key="${selectedField}"]`)
                setSelectedField(prevState => prevState - 1)
            }
            if (accessedElement != null){
                accessedElement.className = `${ambulatePage.section_item_field} ${ambulatePage.section_item_field_active}`
                accessedElement.scrollIntoView({behavior: "smooth"})
                let headerOffset = 180;
                let elementPosition = accessedElement.getBoundingClientRect().top;
                let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            if (lostElement != null){
                lostElement.className = `${ambulatePage.section_item_field}`
            }
            
        }
    }

    useEffect(() => {
        let currentArea:any = null
        let elem = null
        if (selectedField != 0){
            elem = document.querySelector(`[parent-key="${selectedField}"]`)
            currentArea = elem?.querySelector('textarea')
            console.log(currentArea.scrollHeight)
        }
        if (currentArea != null){
            currentArea.style.height = inputNames[selectedField - 1].height
            currentArea.style.padding_top = '0px'
            currentArea.style.padding_bottom = '0px'
            currentArea.style.height = `${currentArea.scrollHeight}px`
        }
    },[value])

    useEffect(() => {
        if (selectedField != 0){
            recognition.addEventListener('result', (e) => { 
                const transcript = Array.from(e.results) 
                    .map(result => result[0]) 
                    .map(result => result.transcript) 
                    .join('') 
                    const newValue = value.strings.slice(0, value.strings.length)
                    newValue[selectedField] = transcript.slice(0,1).toUpperCase() + transcript.slice(1,transcript.length)
                    setValue({strings:newValue})
            })

            if (micActive == false){
                try{
                    recognition.start()
                }catch(e){}
                recognition.stop()
            }else{
                recognition.start()
            }
        }
    },[micActive])
    

    const inputNames = [
        {name: "Ф.И.О. пациента", placeholder: "Иванов Иван Иванович", height: "60px"},
        {name: "Дата рождения", placeholder: "19.09.1999", height: "60px"},
        {name: "Жалобы", placeholder: "Боль за грудиной, в области сердца, одышка, учащенное сердцебиение, перебои в работе сердца, отеки нижних конечностей, лица, головную боль, головокружение", height: "150px"},
        {name: "Анамнез заболевания", placeholder: "Боль за грудиной, в области сердца, одышка, учащенное сердцебиение, перебои в работе сердца, отеки нижних конечностей, лица, головную боль, головокружение", height: "150px"},
        {name: "Аллергологический анамнез", placeholder: "Не отягощён, общее состояние удовлетворительное, положение тела активное", height: "60px"},
        {name: "Телосложение", placeholder: "Нормостеническое", height: "60px"},
        {name: "Рост", placeholder: "180 см", height: "60px"},
        {name: "Вес", placeholder: "100 кг", height: "60px"},
        {name: "ИМТ", placeholder: "56", height: "60px"},
        {name: "Температура тела", placeholder: "36,6 °С", height: "60px"},
        {name: "Кожные покровы", placeholder: "Окраска бледно-розовая, кожа влажная, рубцы, сыпь, сосудистые звездочки", height: "60px"},
        {name: "Слизистая ротовой полости", placeholder: "Розовая, имеются язвы, гиперемия", height: "60px"},
        {name: "Конъюнктива", placeholder: "Бледно-розовая, гиперемирована, желтушна, поверхность гладкая", height: "60px"},
        {name: "Подкожно-жировая клетчатка", placeholder: "Выражена избыточно", height: "60px"},
        {name: "Подкожные лимфатические узлы", placeholder: "Не увеличены", height: "60px"},
        {name: "Сердечно-сосудистая система", placeholder: "Тоны ясные, громкие. Шумы: систолический (функциональный, органический), локализуется на верхушке, справа от грудины", height: "110px"},
        {name: "Артериальное давление", placeholder: "120/70 мм.рт.ст", height: "60px"},
        {name: "ЧСС", placeholder: "80 в 1 минуту", height: "60px"},
        {name: "Дыхательная система", placeholder: "", height: "60px"},
        {name: "Пищеварительная система", placeholder: "", height: "60px"},
        {name: "Мочевыделительная система", placeholder: "", height: "60px"},
        {name: "Диагноз", placeholder: "", height: "60px"},
        {name: "План обследования", placeholder: "", height: "60px"},
        {name: "План лечения", placeholder: "", height: "60px"},
    ]

    useEffect(() => {
        document.addEventListener("keydown", handlerKeyPress);
        return () => document.removeEventListener("keydown", handlerKeyPress);
      }, [handlerKeyPress]);

    return(
        <div tabIndex={1} className={ambulatePage.body}>
            <div className={ambulatePage.header}>
                <p className={ambulatePage.state}>
                    Состояние:
                </p>
                {micActive
                ?
                <div className={ambulatePage.stateMic}>
                    <img src={microphone}/>
                    <p className={ambulatePage.micActive}>
                        Идет запись
                    </p>
                </div>
                :
                <div className={ambulatePage.stateMic}>
                    <img src={microphoneDiactivated}/>
                    <p className={ambulatePage.micIgnore}>
                        Режим ожидания
                    </p>
                </div>
                }
            </div>
            <div className={ambulatePage.section}>
                {inputNames.map((item, index) => 
                <div key={index} parent-key={index + 1} className={ambulatePage.section_item}>
                    <div >
                        <p data-key={index + 1} className={ambulatePage.section_item_field}>
                        {item.name}
                        </p>
                    </div>
                    <textarea placeholder={item.placeholder} className={ambulatePage.section_item_input} style={{height: item.height, resize:"none"}} value={ value.strings[index + 1] != "" ? value.strings[index + 1] : ""} />
                </div>
                )}
            </div>
        </div>
    )
}

export default AmbulatePage;
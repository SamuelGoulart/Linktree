const html = document.querySelector('html')

const readDB = () => JSON.parse(localStorage.getItem('bank')) ?? []

const setDB = (bank) => localStorage.setItem('bank', JSON.stringify(bank))

const insertDB = (dadosCadastro) => {
    const bank = readDB()
    bank.push(dadosCadastro)
    setDB(bank)
}

const saveTheme = () => {

    const newClient = {
        theme: 'light'
    }
    insertDB(newClient)
}

const updateTheme = (theme) => {

    const updatedTheme = {
        theme: theme
    }

    const db = readDB()
    db[0] = updatedTheme
    setDB(db)
}

const getStyle = (element, style) =>
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

const initialColors = {
    backgroundThemeDark: getStyle(html, '--background-theme-dark'),
    colorTextThemeDark: getStyle(html, '--color-text-theme-dark')
}

const clearTheme = {
    backgroundThemeDark: 'white',
    colorTextThemeDark: 'black'
}

const transformKey = key =>
    "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key =>
        html.style.setProperty(transformKey(key), colors[key])
    )
}

const actionButttons = (event) => {

    const db = readDB()
    const element = event.target
    const action = element.dataset.theme
    const img = document.querySelector('#img')

    if (db.length == 0) {
        saveTheme()
    }

    if (action == 'dark') {
        changeColors(clearTheme)
        img.dataset.theme = 'light'
        img.src = './img/moon.svg'
        const theme = 'light'
        updateTheme(theme)

    } else {
        changeColors(initialColors)
        img.dataset.theme = 'dark'
        img.src = './img/sun.svg'
        const theme = 'dark'
        updateTheme(theme)
    }

}

const lastUsedTheme = () =>{
    const db = readDB()
    if (db[0].theme == 'dark') {
        changeColors(initialColors) 
    }else{
        img.src = './img/moon.svg'
        changeColors(clearTheme)
    }
}


document.querySelector('#img').addEventListener('click', actionButttons)

lastUsedTheme()

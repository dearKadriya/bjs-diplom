const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout((response)=> {
        if (response.success) {
            location.reload();
        } else console.log('ошибка');
    });
};

ApiConnector.current((response) => {
    if (response.success){
        ProfileWidget.showProfile(response.data);
    }
});

const rates = new RatesBoard;
function getStockRates(){
     ApiConnector.getStocks( (response) => {
         if (response.success){
             rates.clearTable();
             rates.fillTable(response.data)
         }
     })
}
getStockRates();
setInterval(getStockRates, 60000);

const manager = new MoneyManager();
function updateBalance(response) {
    if (response.success){
        ProfileWidget.showProfile(response.data);
        manager.setMessage(true, `Успешно`);
    } else manager.setMessage(false, `${response.error}`);
}
function add (data){
    ApiConnector.addMoney(data, updateBalance)
}

manager.addMoneyCallback = add;

function convert(data){
    ApiConnector.convertMoney(data, updateBalance);
}
manager.conversionMoneyCallback = convert;

function send(data) {
    ApiConnector.transferMoney(data, updateBalance);
}

manager.sendMoneyCallback = send;

const favourite = new FavoritesWidget();
updateFavourites = (response) =>{
    if (response.success){
        favourite.clearTable();
        favourite.fillTable(response.data);
        manager.updateUsersList(response.data);
        favourite.setMessage(true, "Успешно")
    } else favourite.setMessage(false, `${response.error}`)
}
function get() {
    ApiConnector.getFavorites(updateFavourites);
}
get();
function addFavour(data) {
    ApiConnector.addUserToFavorites(data, updateFavourites);
}
favourite.addUserCallback = addFavour;

function removeFavour(data){
    ApiConnector.removeUserFromFavorites(data, updateFavourites);
}
favourite.removeUserCallback = removeFavour;
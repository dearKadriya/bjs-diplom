const logout = new LogoutButton();
function checkOut(Response) {
    if (Response.success) {
        location.reload();
    } else console.log('ошибка');
}
logout.action = () => {
    ApiConnector.logout(checkOut);
};

ApiConnector.current(current = (Response) => {
    if (Response.success){
        ProfileWidget.showProfile(Response.data);
    }
});

const rates = new RatesBoard;
function getStockRates(){
     ApiConnector.getStocks(updateRates= (Response) => {
         if (Response.success){
             rates.clearTable();
             rates.fillTable(Response.data)
         }
     })
}
getStockRates();
setInterval(getStockRates, 60000);

const manager = new MoneyManager();
function updateBalance(Response) {
    if (Response.success){
        ProfileWidget.showProfile(Response.data);
        manager.setMessage(true, `Успешно`);
    } else manager.setMessage(false, `${Response.error}`);
}
function add (data){
    ApiConnector.addMoney({currency: data.currency, amount: data.amount}, updateBalance)
}

manager.addMoneyCallback = add;

function convert(data){
    ApiConnector.convertMoney({fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount},updateBalance);
}
manager.conversionMoneyCallback = convert;

function send(data) {
    ApiConnector.transferMoney({to: data.to, currency: data.currency, amount: data.amount}, updateBalance);
}

manager.sendMoneyCallback = send;

const favourite = new FavoritesWidget();
updateFavourites = (Response) =>{
    if (Response.success){
        favourite.clearTable();
        favourite.fillTable(Response.data);
        manager.updateUsersList(Response.data);
        favourite.setMessage(true, "Успешно")
    } else favourite.setMessage(false, `${Response.error}`)
}
function get(data) {
    ApiConnector.getFavorites(updateFavourites);
}
get();
function addFavour(data) {
    ApiConnector.addUserToFavorites({id: data.id, name: data.name}, updateFavourites);
}
favourite.addUserCallback = addFavour;

function removeFavour(data){
    console.log(data.id);
    ApiConnector.removeUserFromFavorites(data, updateFavourites);
}
favourite.removeUserCallback = removeFavour;
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurare CORS pentru a permite comunicarea cu frontend-ul
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend-ul Vite rulează pe portul 5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conectare la MySQL
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",  # Înlocuiește cu userul tău MySQL
        password="root",  # Înlocuiește cu parola ta MySQL
        database="magazin_handmade"  # Numele bazei de date
    )

# Model Pydantic pentru comenzi
class Order(BaseModel):
    client: str
    product: str
    quantity: int
    order_date: str

class CartItem(BaseModel):
    product_id: int
    quantity: int

class FavoriteItem(BaseModel):
    product_id: int

# Rute pentru gestionarea comenzilor
@app.get("/orders")
def get_orders():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Orders")
    orders = cursor.fetchall()
    cursor.close()
    db.close()
    return orders

@app.post("/orders")
def create_order(order: Order):
    db = get_db_connection()
    cursor = db.cursor()
    query = "INSERT INTO Orders (client, product, quantity, order_date) VALUES (%s, %s, %s, %s)"
    values = (order.client, order.product, order.quantity, order.order_date)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Comanda adăugată cu succes!"}

# Rute pentru gestionarea coșului
@app.get("/cart")
def get_cart():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT Cart.id, Orders.product, Orders.price, Cart.quantity 
        FROM Cart 
        JOIN Orders ON Cart.product_id = Orders.id
    """)
    cart = cursor.fetchall()
    cursor.close()
    db.close()
    return cart

# Rute pentru gestionarea favorite
@app.get("/favorites")
def get_favorites():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT Favorites.id, Orders.product, Orders.price, Orders.image 
        FROM Favorites 
        JOIN Orders ON Favorites.product_id = Orders.id
    """)
    favorites = cursor.fetchall()
    cursor.close()
    db.close()
    return favorites

# Pornire server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
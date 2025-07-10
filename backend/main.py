from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
from datetime import date


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
        user="root",  
        password="root",  
        database="message_in_a_bookmark"
    )

class Product(BaseModel):
    name_product: str
    descr_product: str
    price: float
    image: str

# Model Pydantic pentru comenzi
class Order(BaseModel):
    client: str
    product_id: int
    quantity: int
    order_date: date

class CartItem(BaseModel):
    product_id: int
    quantity: int

class FavoriteItem(BaseModel):
    product_id: int


# Rute pentru gestionarea produselor
@app.get("/products")
def get_products():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Products")
    products = cursor.fetchall()
    cursor.close()
    db.close()
    return products

@app.post("/products")
def create_product(product: Product):
    db = get_db_connection()
    cursor = db.cursor()
    query = "INSERT INTO Products (name, description, price, image) VALUES (%s, %s, %s, %s)"
    values = (product.name_product, product.descr_product, product.price, product.image)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Produs adăugat cu succes!"}


# Rute pentru gestionarea comenzilor
# @app.get("/orders")
# def get_orders():
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)
#     cursor.execute("SELECT * FROM Orders")
#     orders = cursor.fetchall()
#     cursor.close()
#     db.close()
#     return orders

# @app.post("/orders")
# def create_order(order: Order):
#     db = get_db_connection()
#     cursor = db.cursor()
#     query = "INSERT INTO Orders (client, product, quantity, order_date) VALUES (%s, %s, %s, %s)"
#     values = (order.client, order.product, order.quantity, order.order_date)
#     cursor.execute(query, values)
#     db.commit()
#     cursor.close()
#     db.close()
#     return {"message": "Comanda adăugată cu succes!"}

@app.post("/orders")
def create_order(order: Order):
    # Verificăm dacă produsul există
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT id FROM Products WHERE id = %s", (order.product_id,))
    product = cursor.fetchone()
    
    if product is None:
        cursor.close()
        db.close()
        raise HTTPException(status_code=404, detail="Produsul nu există")
    
    # Inserăm comanda cu referința la produs
    query = "INSERT INTO Orders (client, product_id, quantity, order_date) VALUES (%s, %s, %s, %s)"
    values = (order.client, order.product_id, order.quantity, order.order_date)
    cursor.execute(query, values)
    db.commit()
    order_id = cursor.lastrowid
    cursor.close()
    db.close()
    
    return {"id": order_id, "message": "Comandă adăugată cu succes!"}

@app.get("/orders")
def get_orders():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT o.id, o.client, o.product_id, p.name_product, o.quantity, p.price, 
               (o.quantity * p.price) as total, o.order_date
        FROM Orders o
        JOIN Products p ON o.product_id = p.id
        ORDER BY o.order_date DESC
    """)
    orders = cursor.fetchall()
    cursor.close()
    db.close()
    return orders

# Rute pentru gestionarea coșului
@app.get("/cart")
def get_cart():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT Cart.id, Products.name_product, Cart.quantity, Products.price 
        FROM Cart 
        JOIN Products ON Cart.product_id = Products.id
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
        SELECT Favorites.id, Products.name_product, Products.price, Products.image 
        FROM Favorites 
        JOIN Products ON Favorites.product_id = Products.id
    """)
    favorites = cursor.fetchall()
    cursor.close()
    db.close()
    return favorites

@app.post("/favorites")
def add_to_favorites(favorite: FavoriteItem):
    db = get_db_connection()
    cursor = db.cursor()
    query = "INSERT INTO Favorites (product_id) VALUES (%s)"
    values = (favorite.product_id,)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Produs adăugat la favorite cu succes!"}

# Pornire server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
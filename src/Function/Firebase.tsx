import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

export const app = initializeApp({
    databaseURL:
        "https://monitoringkedipan-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

export const db = getDatabase(app)

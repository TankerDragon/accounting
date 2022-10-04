import mysql.connector

remotedb = mysql.connector.connect(
  host="5.182.26.11",
  user="host1010_sam",
  password="@akb21s4m$",
  database="host1010_datastore"
)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="@akb21s4m$",
  database="accounting"
)

val = []

mycursor = mydb.cursor()
remotecursor = remotedb.cursor()

remotecursor.execute("select * from auth_user")

for x in remotecursor:
    val.append(x)
    # print(x)

# print(len(val))
################################
sql = "INSERT INTO core_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (%s, %s, %s,%s,%s,%s,%s,%s,%s,%s,%s)"


mycursor.executemany(sql, val)

mydb.commit()

print(mycursor.rowcount, "was inserted.")
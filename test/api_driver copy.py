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

remotecursor.execute("select * from budget_log where id=239")

for x in remotecursor:
    val.append(x)
    # print(x)

print(len(val))
print(val)
################################
# sql = "INSERT INTO api_driver (id, d_budget, l_budget, r_budget, first_name, last_name, driver_type, is_active, s_budget, gross_target, dispatcher_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"


# mycursor.executemany(sql, val)

# mydb.commit()

# print(mycursor.rowcount, "was inserted.")
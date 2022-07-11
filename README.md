
## Run Locally

Clone the project

```bash
  git clone https://github.com/sernanic/tutorProject.git
```
### Frontend Instructions

Go to the frontend of the project directory

```bash
  cd tutorProject/frontend
```

Install dependencies 

```bash
  npm install
```

### Backend Instructions

Go to the backend of the project directory

```bash
  cd tutorProject/backend
```

#### Install dependencies 

Installation might change based on OS

* fastapi
* uvicorn
* sqlalchemy
* urllib

### Database Instructions

* Download Mysql

* Download Mysql Workbench

* Set Mysql password

* Run db_update.sql in mysql Workbench

* Go to the config file of the backend to adjust  db url according to your mysql username and password

```bash
  cd tutorProject/backend/config
```
* Edit line 13 of the file db.py with your mysql information

```python
  engine = create_engine('mysql+pymysql://{username}:%s@localhost:3306/tutorProject' % quote('{mysqlpassword}'))
  //example:
  engine = create_engine('mysql+pymysql://nicolasSerna:%s@localhost:3306/tutorProject' % quote('12345'))
```
* run db_update.sql file, located  in tutorProject/backend/config, mysql Workbench to setup database and create all tables/data needed

### Start the frontend / backend servers

#### backend

```bash
cd tutorProject/backend

uvicorn main:app --reload
```

*one a separate command line window*

#### frontend

```bash
cd tutorProject/frontend

npm run start
```





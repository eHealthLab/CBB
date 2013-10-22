#
# Build an empty statistical consulting database
#
# Author: Sarah kreidler
# Date: 8/17/2013
#
library(RSQLite)

## edit to the appropriate output path
dbFile <- "myConsultingDB.sqlite"

#
# Create an empty DB
# 
consultingDB <- dbConnect(SQLite(),dbFile) 

#
# Define the investigator table
#
dbSendQuery(conn = consultingDB,
            "CREATE TABLE tableInvestigator
             (id integer primary key autoincrement,
              name TEXT,
              title TEXT,
              office TEXT,
              directions TEXT,
              address TEXT,
              phone TEXT,
              pager TEXT,
              fax TEXT,
              email TEXT,
              notes TEXT,
              speedtype TEXT)")

#
# Define the Project table
#
dbSendQuery(conn = consultingDB,
            "CREATE TABLE tableProject
             (id integer primary key autoincrement,
              investigatorId INTEGER,
              name TEXT,
              createDate INTEGER,
              notes TEXT,
              FOREIGN KEY(investigatorId) REFERENCES tableInvestigator(id)
            )")

#
# Define the Milestone table
#
dbSendQuery(conn = consultingDB,
            "CREATE TABLE tableMilestone
             (id integer primary key autoincrement,
              projectId INTEGER,
              name TEXT,
              createDate INTEGER,
              deadline INTEGER,
              estimatedHours INTEGER,
              notes TEXT,
              FOREIGN KEY(projectId) REFERENCES tableProject(id)
            )")


#
# Define the consultant table
#
dbSendQuery(conn = consultingDB,
            "CREATE TABLE tableConsultant
             (id integer primary key autoincrement,
              name TEXT,
              email TEXT)")


#
# Define the billing table
#
dbSendQuery(conn = consultingDB,
            "CREATE TABLE tableBilling
             (id integer primary key autoincrement,
              milestoneId INTEGER,
              consultantId INTEGER,
              note TEXT,
              hours REAL,
              FOREIGN KEY(milestoneId) REFERENCES tableMilestone(id),
              FOREIGN KEY(consultantId) REFERENCES tableConsultant(id)
            )")

#
# list the tables
#
dbListTables(consultingDB)


# close the connection
dbDisconnect(consultingDB)




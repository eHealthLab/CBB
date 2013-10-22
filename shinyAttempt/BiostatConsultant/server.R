#
# Radiology request tracking system
#
# 
#
#
library(shiny)
library(RSQLite)

# Define server logic required to generate and plot a random distribution
shinyServer(function(input, output) {
  
  databaseFile = "radiologyConsultingDB.sqlite"
  
  #### CRUD routines for the investigator table ####
  output$investigatorRead <- renderTable({ 
    # connect to the Database
    conn = dbConnect(SQLite(),dbname=databaseFile);
    
    # build the where clause
    whereClause = "";
    
    # retrieve the results
    results=dbGetQuery(conn, 
                       paste("SELECT * from tableInvestigator ", whereClause))
    dbDisconnect(conn);
    
    data.frame(results)

  })
  
#   output$investigatorCreate <- renderTable({ 
#     # connect to the Database
#     conn = dbConnect(SQLite(),dbname=databaseFile);
#     
#     dbBeginTransaction(conn)
#     dbGetPreparedQuery(conn, "INSERT INTO tableInvestigator (
#                        name,
#                        title) VALUES (?,?)", 
#                        bind.data=data.frame(name="bob", title="MD"))
#     dbCommit(conn)
#     
#     # retrieve the results
#     results=dbGetQuery(conn, 
#                        paste("SELECT * from tableInvestigator ", whereClause))
#     
#     dbDisconnect(conn);
#     
#     results
#   }
  
  #### CRUD routines for the project table ####
  
  
  #### CRUD routines for the milestone table ####
  
  
  ### Crud routines for the consultant table ###
  

  
  
})



CREATE LOGIN [pwcadmin] WITH PASSWORD = 'P@ssword01', DEFAULT_DATABASE="master", DEFAULT_LANGUAGE="us_english", CHECK_POLICY= OFF;
GO

CREATE DATABASE [Cloud_2_0]
GO

-- Creates a database user for the login created above.  
CREATE USER [pwcadmin]  FOR LOGIN [pwcadmin] ;  
GO 

exec sp_addrolemember 'db_owner', 'pwcadmin';
GO

DROP TABLE Notes;
GO

CREATE TABLE [Notes] (
    [Id] UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID(),
    [title] nvarchar(100),
    [body] nvarchar(max),
    [createdAt] datetime DEFAULT(GetDate()),
    [updatedAt] datetime DEFAULT(GetDate())
)
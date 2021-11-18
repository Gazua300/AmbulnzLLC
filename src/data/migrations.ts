import { con } from './connection'

con.raw(`

`)
.then(()=>{
  console.log('Table has created')
})
.catch(err=>{
  console.log(err)
})
.finally(()=>{
  con.destroy()
})

// create table case_fullstack_ingredients(id varchar(255) not null primary key,
// ingredients varchar(50) not null,
// pizza_id varchar(255) not null,
// foreign key(pizza_id) references case_fullstack_pizza(id));


// create table case_fullstack_pizza(id varchar(255) not null primary key,
// name varchar(50) not null,
// price float not null);


// create table case_fullstack_adm(id varchar(255) not null primary key,
// name varchar(50) not null,
// email varchar(100) not null unique,
// password varchar(255) not null);


// create table case_fullstack_orders(id varchar(255) not null primary key,
// pizza varchar(50) not null,
// price float not null,
// quantity int not null,
// total float not null);

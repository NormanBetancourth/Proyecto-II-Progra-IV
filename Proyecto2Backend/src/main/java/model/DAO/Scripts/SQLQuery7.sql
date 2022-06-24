SET DATEFORMAT ydm
DECLARE @dt DATETIME2 = '2016-01-02 12:03:28'
SELECT @dt AS 'date from YDM Format'

-- Se borran las secuencias
drop sequence sec_usuarios;
drop sequence sec_especialidades;
drop sequence sec_ciudades;
drop sequence sec_citas;
drop sequence sec_antecedentes;
drop sequence sec_contactos;
drop sequence sec_contactos_personas;
drop sequence sec_horarios;

-- Se borran las tablas 10
drop table citas;
drop table contactos;
drop table horarios;
drop table antecedentes;
drop table pacientes;
drop table medicos;
drop table administradores;
drop table usuarios;
drop table ciudades;
drop table especialidades;






-- Se crean las secuencias
create sequence sec_usuarios 
	as int
	start with 100 
	increment by 1;
create sequence sec_especialidades 
	as int
	start with 1 
	increment by 1;
create sequence sec_ciudades 
	as int
	start with 1000 
	increment by 1;
create sequence sec_citas
    as int
    start with 2000
	increment by 1;
create sequence sec_antecedentes
    as int
    start with 3000
	increment by 1;
create sequence sec_contactos_personas
    as int
    start with 4000
	increment by 1;
create sequence sec_horarios
    as int
    start with 5000
	increment by 1;
create sequence sec_contactos
    as int
    start with 6000
	increment by 1;

--Se crean las tablas
create table usuarios(id int not null, nombre varchar(20) not null, tipo varchar(10) not null);
create table administradores(id int not null, clave varchar(20) not null);
create table medicos(id int not null, clave varchar(20) not null, especialidad int null, costo decimal(11,4) null, ciudad int  null, clinica varchar(20) null, estado varchar(20) not null, presentacion text null);
create table pacientes(id int not null, telefono varchar(10), idMed int not null);
create table horarios(estado varchar(30) not null, id_medico int not null, dia varchar(30) not null, hora_inicio time  not null, hora_final time not null, frecuencia varchar(10) not null); 
create table ciudades(codigo int not null, nombre varchar(20) not null, provincia varchar(20) not null);
create table especialidades(codigo int not null, nombre varchar(20) not null, descripcion text null); 
create table citas(codigo int not null, id_medico int not null, id_paciente int not null, fecha_hora smalldatetime not null, estado varchar(20) not null, signos text not null, motivo text not null, diagnostico text not null, prescripcion text not null, medicamentos text not null);
create table antecedentes(codigo int not null, id_paciente int not null, tipo varchar(20) not null, anotacion text not null);
create table contactos(numero int not null, id_personal int not null,  id_paciente int not null, nombre varchar(20) not null, telefono varchar(10) not null);

-- Se crean todas las llaves
-- PK
alter table usuarios add constraint usuarios_pk primary key (id);
alter table administradores add constraint administradores_pk primary key(id);
alter table medicos add constraint medicos_pk primary key(id);
alter table pacientes add constraint pacientes_pk primary key(id);
alter table especialidades add constraint especialidades_pk primary key(codigo);
alter table ciudades add constraint ciudades_pk primary key(codigo);
alter table citas add constraint medicos_citas_pk primary key(codigo);
alter table antecedentes add constraint antecedentes_pk primary key(codigo);
alter table contactos add constraint contactos_pk primary key(numero);

-- FK
alter table administradores
	add constraint administradores_id_fk foreign key(id) 
		references usuarios(id) on delete cascade;
alter table medicos
	add constraint medicos_id_fk foreign key(id) 
		references usuarios(id) on delete cascade;
alter table medicos
	add constraint medicos_especialidad_fk foreign key(especialidad) 
		references especialidades(codigo) on delete cascade;
alter table medicos
	add constraint medicos_ciudad_fk foreign key(ciudad) 
		references ciudades(codigo) on delete cascade;
alter table pacientes
	add constraint pacientes_fk foreign key(id) 
		references usuarios(id) on delete cascade;
alter table pacientes
	add constraint pacientes_med_fk foreign key(idMed) 
		references medicos(id);
alter table horarios
	add constraint horarios_medico_fk foreign key(id_medico) 
		references medicos(id) on delete cascade;
alter table citas
	add constraint citas_medico_fk foreign key(id_medico) 
		references medicos(id) on delete cascade;
alter table citas
	add constraint citas_paciente_fk foreign key(id_paciente) 
		references pacientes(id) on delete no action;
alter table contactos
	add constraint contactos_paciente_fk foreign key(id_paciente) 
		references pacientes(id) on delete cascade;
alter table antecedentes
	add constraint antecedentes_paciente_fk foreign key(id_paciente) 
		references pacientes(id) on delete cascade;
-- CK
alter table usuarios 
	add constraint usuarios_ck1 Check (tipo in ('Admin','Medico','Paciente'));
alter table medicos 
	add constraint medicos_ck1 Check (estado in ('Aprobado','Espera','Rechazado'));
alter table ciudades 
	add constraint ciudades_ck1 Check (provincia in ('San Jose','Heredia','Limon','Cartago','Alajuela','Puntarenas','Guanacaste'));
alter table horarios
	add constraint horarios_ck1 Check (frecuencia in ('00:30','01:00'));
alter table citas 
	add constraint citas_ck1 Check (estado in ('Finalizado','Registrado', 'Cancelado'));
alter table antecedentes 
	add constraint antecedentes_ck1 Check (tipo in ('Enfermedad','Alergia', 'Cirugia', 'Padecimiento', 'Otro'));
alter table horarios 
	add constraint horarios_ck12 Check (dia in ('Lunes','Martes', 'Miercoles', 'Jueves', 'Viernes'));
alter table horarios 
	add constraint horarios_ck13 Check (estado in ('activo','inactivo'));

-- UK
alter table usuarios add constraint usuarios_nombre_uk unique (nombre);
alter table especialidades add constraint especialidades_nombre_uk unique (nombre);
alter table ciudades add constraint ciudades_nombre_uk unique (nombre);



-- Ingresando datos de prueba
-- Especialidades
insert into especialidades(codigo, nombre, descripcion) values (next value for sec_especialidades, 'General', 'Previene, detecta y trata enfermedades comunes.');
insert into especialidades(codigo, nombre, descripcion) values (next value for sec_especialidades, 'Cardiologia', 'Estudio, diagn�stico y tratamiento de las enfermedades del coraz�n y del sistema circulatorio.');
insert into especialidades(codigo, nombre, descripcion) values (next value for sec_especialidades, 'Psicologia', 'Estudia las funciones mentales y de comportamiento.');
insert into especialidades(codigo, nombre, descripcion) values (next value for sec_especialidades, 'Odontologia', 'Diagn�stico y tratamiento del aparato estomagn�tico.');
insert into especialidades(codigo, nombre, descripcion) values (next value for sec_especialidades, 'Pediatria', 'Atenci�n m�dica de beb�s, ni�os y adolescentes.');
insert into especialidades(codigo, nombre, descripcion) values (next value for sec_especialidades, 'Anestecia General',  null);


-- Ciudades
insert into ciudades(codigo, nombre, provincia) values (next value for sec_ciudades, 'San Jose', 'San Jose');
insert into ciudades(codigo, nombre, provincia) values (next value for sec_ciudades, 'Tibas', 'San Jose');
insert into ciudades(codigo, nombre, provincia) values (next value for sec_ciudades, 'Heredia', 'Heredia');
insert into ciudades(codigo, nombre, provincia) values (next value for sec_ciudades, 'Barva', 'Heredia');

-- Usuarios
insert into usuarios(id, nombre, tipo) values (next value for sec_usuarios, 'Lucia Hernandez', 'Admin');
insert into usuarios(id, nombre, tipo) values (next value for sec_usuarios, 'Juan Leon', 'Medico');
insert into usuarios(id, nombre, tipo) values (next value for sec_usuarios, 'Nicolas Suarez', 'Medico');
insert into usuarios(id, nombre, tipo) values (next value for sec_usuarios, 'Joseph Romero', 'Paciente');
insert into usuarios(id, nombre, tipo) values (next value for sec_usuarios, 'Maria Vargas', 'Paciente');
insert into usuarios(id, nombre, tipo) values (next value for sec_usuarios, 'Jose Rojas', 'Paciente');
insert into usuarios(id, nombre, tipo) values (next value for sec_usuarios, 'Marta Mendez', 'Paciente');
insert into usuarios(id, nombre, tipo) values (next value for sec_usuarios, 'Felicia Ramirez', 'Medico');
insert into usuarios(id, nombre, tipo) values (110, 'Maria Carmona', 'Medico');
insert into usuarios(id, nombre, tipo) values (111, 'Carlos Felicio', 'Medico');

-- Medicos
insert into medicos(id, clave, especialidad, costo, ciudad, clinica, estado, presentacion) values (101, 'password101', 1, 70000, 1000, 'Athena', 'Espera', null);
insert into medicos(id, clave, especialidad, costo, ciudad, clinica, estado, presentacion) values (102, 'password102', 4, 100000, 1002, 'Pacific Global', 'Espera', 'Amante de nuevos retos');
insert into medicos(id, clave, especialidad, costo, ciudad, clinica, estado, presentacion) values (105, 'password105', 6, 100000, 1003, 'Salud', 'Aprobado', null);
insert into medicos(id, clave, especialidad, costo, ciudad, clinica, estado, presentacion) values (110, 'password1011', 3, 700000, 1000, 'Athena-Clinic', 'Espera', null);
insert into medicos(id, clave, especialidad, costo, ciudad, clinica, estado, presentacion) values (111, 'password1021', 4, 150000, 1002, 'Pacific-Heredia', 'Espera', 'Amante de nuevos retos');

-- Horarios
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 101, 'Lunes', '16:00:00', '20:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 101, 'Martes', '12:00:00', '14:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 101, 'Miercoles', '10:00:00', '12:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 101, 'Jueves', '8:00:00', '10:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 101, 'Viernes', '19:00:00', '22:00:00','01:00');

insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 102, 'Lunes', '16:00:00', '20:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 102, 'Martes', '12:00:00', '14:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 102, 'Miercoles', '10:00:00', '12:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 102, 'Jueves', '08:00:00', '10:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 102, 'Viernes', '19:00:00', '22:00:00','01:00');

insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 105, 'Lunes', '16:00:00', '20:00:00','00:30');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 105, 'Martes', '12:00:00', '14:00:00','00:30');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 105, 'Miercoles', '10:00:00', '12:00:00','00:30');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 105, 'Jueves', '08:00:00', '10:00:00','00:30');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 105, 'Viernes', '19:00:00', '22:00:00','00:30');

insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 110, 'Lunes', '13:00:00', '15:00:00','00:30');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 110, 'Martes', '12:00:00', '14:00:00','00:30');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 110, 'Miercoles', '10:00:00', '12:00:00','00:30');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 110, 'Jueves', '08:00:00', '10:00:00','00:30');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 110, 'Viernes', '13:00:00', '15:00:00','00:30');

insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 111, 'Lunes', '10:00:00', '13:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 111, 'Martes', '07:00:00', '14:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 111, 'Miercoles', '10:00:00', '12:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('activo', 111, 'Jueves', '08:00:00', '10:00:00','01:00');
insert into horarios(estado, id_medico, dia, hora_inicio, hora_final, frecuencia) values ('inactivo', 111, 'Viernes', '19:00:00', '22:00:00','01:00');

-- Admins
insert into administradores(id, clave) values (100, 'password100');

-- Pacientes
insert into pacientes(id, telefono, idMed) values (103, '84201936', 101);
insert into pacientes(id, telefono, idMed) values (104, '89129210', 102);
insert into pacientes(id, telefono, idMed) values (105, '71201936', 101);
insert into pacientes(id, telefono, idMed) values (106, '69129870', 102);


-- Antecedentes
insert into antecedentes(codigo, id_paciente, tipo, anotacion) values(next value for sec_antecedentes, 103, 'Alergia', 'El medicamento zulfa le causa fiebre y zarpullido');
insert into antecedentes(codigo, id_paciente, tipo, anotacion) values(next value for sec_antecedentes, 103, 'Padecimiento', 'Migrana');
insert into antecedentes(codigo, id_paciente, tipo, anotacion) values(next value for sec_antecedentes, 104, 'Cirugia', 'Tumor cerebral');
insert into antecedentes(codigo, id_paciente, tipo, anotacion) values(next value for sec_antecedentes, 104, 'Padecimiento', 'Intolerante a la lactosa');

-- Contactos
insert into contactos(numero, id_personal, id_paciente, nombre, telefono) values(next value for sec_contactos, next value for sec_contactos_personas, 103, 'Juana Perez', '7777777');
insert into contactos(numero, id_personal, id_paciente, nombre, telefono) values(next value for sec_contactos, next value for sec_contactos_personas, 103, 'Tamara Perez', '88888888');
insert into contactos(numero, id_personal, id_paciente, nombre, telefono) values(next value for sec_contactos, next value for sec_contactos_personas, 104, 'Daniel Cruz', '55555555');
insert into contactos(numero, id_personal, id_paciente, nombre, telefono) values(next value for sec_contactos, next value for sec_contactos_personas, 104, 'Maria Cruz', '33333333');

-- Citas
insert into citas(codigo, id_medico, id_paciente, fecha_hora, estado, signos, motivo, diagnostico, prescripcion, medicamentos) 
values (next value for sec_citas, 101, 103, '2022-22-06 16:00:00', 'Finalizado', 'Presion normal, ...', 'Problemas respiratorios.', 'Gripe', 'Acetaminofen', 'Cada 8 horas');
insert into citas(codigo, id_medico, id_paciente, fecha_hora, estado, signos, motivo, diagnostico, prescripcion, medicamentos) 
values (next value for sec_citas, 101, 104, '2022-22-06 12:00:00', 'Finalizado', 'dolor corporal, ...', 'Problemas fisicos.', 'sobreentrenamiento', 'Yiee baree', 'Cada 2 horas');
insert into citas(codigo, id_medico, id_paciente, fecha_hora, estado, signos, motivo, diagnostico, prescripcion, medicamentos) 
values (next value for sec_citas,101, 104, '2022-23-06 14:00:00', 'Finalizado', 'Presion normal, ...', 'Chequeo general', 'Deficiencia vitaminas', 'Vitaminas C y B12', 'Diario, una vez al d�a');
insert into citas(codigo, id_medico, id_paciente, fecha_hora, estado, signos, motivo, diagnostico, prescripcion, medicamentos) 
values (next value for sec_citas,102, 103, '2022-23-06 10:00:00', 'Registrado', 'Presion normal, ...', 'Dolor de enc�as', 'Caries', 'Acetaminofen', 'Cada 8 horas');
insert into citas(codigo, id_medico, id_paciente, fecha_hora, estado, signos, motivo, diagnostico, prescripcion, medicamentos) 
values (next value for sec_citas,102, 104, '2022-21-06 12:00:00', 'Finalizado', 'Presion levemente alta, ...', 'Problemas de mandibula', 'Operacion', 'Acetaminofen', 'Cada 8 horas');

select * from usuarios;
select * from administradores;
select * from citas;
select * from pacientes;
select * from medicos;
select * from ciudades;
select * from horarios;
select * from especialidades;
select * from antecedentes;
select * from contactos;
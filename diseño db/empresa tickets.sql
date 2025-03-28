CREATE TABLE `Employee` (
  `id` serial PRIMARY KEY NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL
);

CREATE TABLE `Equipment` (
  `id` serial PRIMARY KEY NOT NULL,
  `equipment` varchar(20) NOT NULL
);

CREATE TABLE `Incident` (
  `id` serial PRIMARY KEY NOT NULL,
  `employee_id` int NOT NULL,
  `equipment_id` int,
  `description` varchar(255) NOT NULL,
  `status` ENUM(PENDIENTE,EN PROCESO,RESUELTO),
  `created_at` timestamp NOT NULL DEFAULT (now())
);

ALTER TABLE `Incident` ADD FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`);

ALTER TABLE `Incident` ADD FOREIGN KEY (`equipment_id`) REFERENCES `Equipment` (`id`);

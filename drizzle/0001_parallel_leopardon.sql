ALTER TABLE `responses` ADD `normalized_name` text;--> statement-breakpoint
CREATE UNIQUE INDEX `responses_normalized_name_unique` ON `responses` (`normalized_name`);
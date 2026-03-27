-- Migration: Add current_year column to room_players table
-- Purpose: Track each player's individual year separately from the room's year
-- Date: March 27, 2026

-- NOTE: This migration is OPTIONAL if you haven't created player records yet.
-- The application is backward compatible and will work without this column.
-- However, to enable proper multi-player game progression, this migration is recommended.

-- STEP 1: ADD COLUMN
ALTER TABLE public.room_players
ADD COLUMN current_year INTEGER DEFAULT 1;

-- STEP 2: UPDATE existing records to have current_year = 1
UPDATE public.room_players
SET current_year = 1;

-- STEP 3: Make the column NOT NULL after setting values
ALTER TABLE public.room_players
ALTER COLUMN current_year SET NOT NULL;

-- STEP 4: VERIFY the column was added (run this to confirm)
-- SELECT table_name, column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'room_players' AND column_name = 'current_year';

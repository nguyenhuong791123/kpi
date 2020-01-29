CREATE OR REPLACE FUNCTION public.init_database(in_db VARCHAR(50), in_com INT)
RETURNS VOID AS $$
DECLARE
  is_s VARCHAR(50);
  is_tn VARCHAR(100);
  is_c VARCHAR(100);
  is_c_t VARCHAR(200);
  is_t_c VARCHAR(200);
  is_t VARCHAR(20);
  is_r INTEGER;
  is_l INTEGER;
  is_d VARCHAR(150);
  is_t_exists INTEGER;
  is_b_exists INTEGER;
  is_c_exists INTEGER;
  is_td VARCHAR(150);
  --is_r_id INTEGER;
  --RETURNING id

  query VARCHAR(200);
  query_val VARCHAR(300);
  cur CURSOR FOR SELECT is_schema, is_table, is_column, is_type, is_nullable, is_length
                   ,(SELECT pgd.description FROM pg_catalog.pg_statio_all_tables AS st INNER JOIN pg_catalog.pg_description pgd ON (pgd.objoid=st.relid) INNER JOIN information_schema.columns c ON (pgd.objsubid=c.ordinal_position AND c.table_schema=st.schemaname AND c.table_name=st.relname) WHERE c.table_schema=tbl.is_schema AND c.table_name=tbl.is_table AND c.column_name=tbl.is_column) AS is_description
                   FROM(SELECT table_schema AS is_schema, table_name AS is_table, column_name AS is_column, CASE WHEN is_nullable='NO' THEN 0 ELSE 1 END AS is_nullable, COALESCE(null, udt_name, data_type) AS is_type, character_maximum_length AS is_length
                   FROM information_schema.columns
                     WHERE table_schema NOT IN ('public','pg_catalog', 'information_schema', 'mente') AND table_name NOT IN('company_basic_session_info', 'one_time_pass_info') AND table_name NOT LIKE('%_rel') OR (table_schema='mente' AND table_name='page_info')) AS tbl;

BEGIN
  IF in_db IS NULL OR in_db = '' THEN
    RAISE EXCEPTION 'Please set databases !!!';
  END IF;
  IF in_com IS NULL OR in_com <= 0 THEN
    RAISE EXCEPTION 'Please set company id !!!';
  END IF;

  OPEN cur;
  LOOP
    FETCH cur INTO is_s, is_tn, is_c, is_t, is_r, is_l, is_d;
    EXIT WHEN NOT FOUND;

    IF is_s!='' AND is_tn!='' AND is_c!='' THEN
      SELECT is_s || '.' || is_tn INTO is_c_t;
      SELECT MAX(page_id) FROM mente.page_info WHERE page_key=is_c_t INTO is_t_exists;
      IF is_t_exists IS NULL OR is_t_exists <= 0 THEN
        SELECT pg_description.description FROM pg_stat_user_tables, pg_description
          WHERE pg_stat_user_tables.relname in (select relname from pg_stat_user_tables)
          AND pg_stat_user_tables.relid=pg_description.objoid AND pg_description.objsubid=0
          AND pg_stat_user_tables.schemaname=is_s AND pg_stat_user_tables.relname=is_tn INTO is_td;

        SELECT 'INSERT INTO mente.page_info(page_key, company_id) VALUES (' || chr(39) || is_c_t || chr(39) || ', ' || in_com || ') RETURNING page_id;' INTO query;
        RAISE NOTICE '%', query;
        EXECUTE query INTO is_t_exists;

        IF is_t_exists > 0 THEN
          SELECT 'INSERT INTO mente.object_label_info(object_id, object_type, object_label, object_lang) VALUES (' || is_t_exists || ', 1, ' || chr(39) || is_td || chr(39) || ',' || chr(39) || 'ja' || chr(39) || ' );' INTO query;
          RAISE NOTICE '%', query;
          EXECUTE query;
        END IF;
      END IF;

      RAISE NOTICE '%', is_t_exists;
      IF is_t_exists IS NULL OR is_t_exists <= 0 THEN
        RAISE EXCEPTION 'Page info is not exists !!!';
      END IF;

      SELECT MAX(block_id) FROM mente.block_info WHERE page_id=is_t_exists INTO is_b_exists;
      IF is_b_exists IS NULL OR is_b_exists <= 0 THEN
        SELECT 'INSERT INTO mente.block_info(page_id) VALUES (' || is_t_exists || ') RETURNING block_id;' INTO query;
        EXECUTE query INTO is_b_exists;
      END IF;

      IF is_b_exists IS NULL OR is_b_exists <= 0 THEN
        RAISE EXCEPTION 'Block info is not exists !!!';
      END IF;

      SELECT is_tn || '.' || is_c INTO is_t_c;
      SELECT MAX(column_id) FROM mente.column_attr_info WHERE column_name=is_t_c INTO is_c_exists;
      RAISE NOTICE '%', is_c_exists;
    	IF is_l IS NULL THEN is_l = 0; END IF;
	    IF is_d IS NULL THEN is_d = ''; END IF;
      IF is_c_exists IS NULL OR is_c_exists <= 0 THEN
	      SELECT 'INSERT INTO mente.column_attr_info(column_name, column_type, column_required, column_length, block_id) VALUES ' INTO query;
        SELECT '(' || chr(39) || is_t_c || chr(39) || ', ' || chr(39) || is_t || chr(39) || ', ' || is_r || ', ' || is_l || ', ' || is_b_exists || ');' INTO query_val;
	      SELECT query || query_val INTO query;
        RAISE NOTICE '%', query;
        EXECUTE query;
	      SELECT '' INTO query;
	    ELSE
	      SELECT 'UPDATE mente.column_attr_info SET column_type=' || chr(39) || is_t || chr(39) || ', column_required=' || is_r || ', column_length='|| is_l || ', block_id=' || is_b_exists || ' WHERE column_id=' || is_c_exists INTO query;
        RAISE NOTICE '%', query;
        EXECUTE query;
	      SELECT '' INTO query;
      END IF;
    END IF;
  END LOOP;

  RETURN;
END;
$$ LANGUAGE plpgsql;
--SELECT public.init_database('smartcrm', 1);

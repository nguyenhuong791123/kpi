DROP SEQUENCE IF EXISTS mente.column_value_id_seq CASCADE;
DROP TABLE IF EXISTS mente.column_value_info;
DROP SEQUENCE IF EXISTS mente.column_attr_id_seq CASCADE;
DROP TABLE IF EXISTS mente.column_attr_info;
DROP SEQUENCE IF EXISTS mente.block_id_seq CASCADE;
DROP TABLE IF EXISTS mente.block_info;
DROP TABLE IF EXISTS mente.page_method_rel;
DROP SEQUENCE IF EXISTS mente.method_id_seq CASCADE;
DROP TABLE IF EXISTS mente.method_info;
DROP SEQUENCE IF EXISTS mente.page_id_seq CASCADE;
DROP TABLE IF EXISTS mente.page_info;
DROP TABLE IF EXISTS mente.object_label_info;

CREATE SEQUENCE mente.page_id_seq;
CREATE TABLE mente.page_info (
  page_id INTEGER NOT NULL DEFAULT nextval('mente.page_id_seq'::regclass),
  page_key varchar(45) NOT NULL DEFAULT '',
  page_source varchar(255) DEFAULT NULL,
  page_flag SMALLINT DEFAULT 0,
  page_order INTEGER DEFAULT 0,
  company_id INTEGER NOT NULL DEFAULT 0,
  page_deleted SMALLINT DEFAULT 0,
  updated_id INTEGER DEFAULT NULL,
  updated_time timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_page_id PRIMARY KEY (page_id),
  CONSTRAINT un_page_key UNIQUE (page_key),
  CONSTRAINT fk_page_info_company_id FOREIGN KEY (company_id) REFERENCES company.company_info(company_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE mente.page_info IS 'ページ情報';
COMMENT ON COLUMN mente.page_info.page_id IS 'ID';
COMMENT ON COLUMN mente.page_info.page_source IS 'ページ日本語「LINKなど」';
COMMENT ON COLUMN mente.page_info.page_flag IS '静的ページ、１は動的ページ「Customize」';
COMMENT ON COLUMN mente.page_info.page_order IS '表示順';
COMMENT ON COLUMN mente.page_info.company_id IS '会社ID「０」は共通';
COMMENT ON COLUMN mente.page_info.page_deleted IS '存在フラグ、１は削除';
COMMENT ON COLUMN mente.page_info.updated_id IS '更新者';
COMMENT ON COLUMN mente.page_info.updated_time IS '更新日';

CREATE TABLE mente.page_group_rel (
  page_group_id INTEGER NOT NULL DEFAULT 0,
  page_id INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (page_group_id, page_id)
);
COMMENT ON TABLE mente.page_group_rel IS 'ページグールプ情報';

CREATE TABLE mente.page_chidren_rel (
  page_parent VARCHAR(200) NOT NULL DEFAULT '',
  page_chidren VARCHAR(200) NOT NULL DEFAULT '',
  PRIMARY KEY (page_parent, page_chidren)
);
COMMENT ON TABLE mente.page_group_rel IS 'ページ内子ページと関連情報';
INSERT INTO mente.page_chidren_rel(page_parent,page_chidren) VALUES ('company.company_info','company.group_info');

CREATE SEQUENCE mente.method_id_seq;
CREATE TABLE mente.method_info (
  method_id INTEGER NOT NULL DEFAULT nextval('mente.method_id_seq'::regclass),
  method_name varchar(70) NOT NULL DEFAULT '',
  updated_id INTEGER DEFAULT NULL,
  updated_time timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_method_id PRIMARY KEY (method_id),
  CONSTRAINT un_method_name UNIQUE (method_name)
);
COMMENT ON TABLE mente.method_info IS 'メソッド情報';
COMMENT ON COLUMN mente.method_info.method_id IS 'ID';
COMMENT ON COLUMN mente.method_info.method_name IS 'メソッド英語';
COMMENT ON COLUMN mente.method_info.updated_id IS '更新者';
COMMENT ON COLUMN mente.method_info.updated_time IS '更新日';

CREATE TABLE mente.page_method_rel (
  page_id INTEGER NOT NULL DEFAULT 0,
  method_id INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (page_id, method_id),
  CONSTRAINT fk_page_method_rel_page_id FOREIGN KEY (page_id) REFERENCES mente.page_info(page_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_page_method_rel_method_id FOREIGN KEY (method_id) REFERENCES mente.method_info(method_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION

);
COMMENT ON TABLE mente.page_method_rel IS 'ページやメソッド関連情報';

CREATE SEQUENCE mente.block_id_seq;
CREATE TABLE mente.block_info (
  block_id INTEGER NOT NULL DEFAULT nextval('mente.block_id_seq'::regclass),
  block_key varchar(45) NOT NULL DEFAULT '',
  block_type varchar(5) NOT NULL DEFAULT 'div',
  block_class varchar(70) NOT NULL DEFAULT '',
  block_style varchar(500) NOT NULL DEFAULT '',
  block_order INTEGER DEFAULT 0,
  page_id INTEGER NOT NULL DEFAULT 0,
  updated_id INTEGER DEFAULT NULL,
  updated_time timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_block_id PRIMARY KEY (block_id),
  CONSTRAINT fk_block_info_page_id FOREIGN KEY (page_id) REFERENCES mente.page_info(page_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE mente.block_info IS 'ブロックカスタマイズタブフォマート情報';
COMMENT ON COLUMN mente.block_info.block_id IS 'ID';
COMMENT ON COLUMN mente.block_info.block_type IS 'タイトル';
COMMENT ON COLUMN mente.block_info.block_class IS 'CSSクラス名';
COMMENT ON COLUMN mente.block_info.block_style IS 'CSSスタイル';
COMMENT ON COLUMN mente.block_info.block_order IS '表示順';
COMMENT ON COLUMN mente.block_info.page_id IS 'ページID';
COMMENT ON COLUMN mente.block_info.updated_id IS '更新者';
COMMENT ON COLUMN mente.block_info.updated_time IS '更新日';

CREATE TABLE mente.object_label_info (
  object_id INTEGER NOT NULL DEFAULT 0,
  object_type INTEGER NOT NULL DEFAULT 0,
  object_label varchar(70) NOT NULL DEFAULT '',
  object_lang varchar(3) NOT NULL DEFAULT 'ja',
  CONSTRAINT pk_object_label_info PRIMARY KEY (object_id, object_type, object_lang)
);
COMMENT ON TABLE mente.object_label_info IS '各ラベル項目のDefault直情報';
COMMENT ON COLUMN mente.object_label_info.object_id IS 'ID';
COMMENT ON COLUMN mente.object_label_info.object_type IS 'オブジェクトタイプ「１：ページ、２：ブロック」';
COMMENT ON COLUMN mente.object_label_info.object_label IS 'ラベル表示名';
COMMENT ON COLUMN mente.object_label_info.object_lang IS '原語';

CREATE SEQUENCE mente.column_attr_id_seq;
CREATE TABLE mente.column_attr_info (
  column_id INTEGER NOT NULL DEFAULT nextval('mente.column_attr_id_seq'::regclass),
  column_name varchar(100) NOT NULL DEFAULT '',
  column_type varchar(20) NOT NULL DEFAULT '',
  column_class varchar(70) DEFAULT NULL,
  column_style varchar(500) DEFAULT NULL,
  column_level INTEGER NOT NULL DEFAULT 0,
  column_required SMALLINT NOT NULL DEFAULT 0,
  column_multiple SMALLINT NOT NULL DEFAULT 0,
  column_parent_id INTEGER DEFAULT NULL,
  column_options varchar(30) NOT NULL DEFAULT '',
  column_add SMALLINT DEFAULT 0,
  column_edit SMALLINT DEFAULT 0,
  column_search SMALLINT DEFAULT 0,
  column_view SMALLINT DEFAULT 0,
  column_default varchar(100) DEFAULT '',
  column_length INTEGER DEFAULT 0,
  column_order INTEGER DEFAULT 0,
  column_width varchar(7) DEFAULT '100%',
  column_search_order INTEGER DEFAULT 0,
  column_search_width varchar(7) DEFAULT '100px',
  column_deleted SMALLINT DEFAULT 0,
  block_id INTEGER NOT NULL DEFAULT 0,
  updated_id INTEGER DEFAULT NULL,
  updated_time timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_column_id PRIMARY KEY (column_id),
  CONSTRAINT un_column_name UNIQUE (column_name),
  CONSTRAINT fk_column_attr_info_block_id FOREIGN KEY (block_id) REFERENCES mente.block_info(block_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);

COMMENT ON TABLE mente.column_attr_info IS '各プリダウン項目の値情報';
COMMENT ON COLUMN mente.column_attr_info.column_id IS 'ID';
COMMENT ON COLUMN mente.column_attr_info.column_name IS '例：「customize_XXX.column_XXX」';
COMMENT ON COLUMN mente.column_attr_info.column_type IS '例：「１：TEXT、２：CHECKBOX、３：RADIO、。。。」';
COMMENT ON COLUMN mente.column_attr_info.column_class IS 'CSSクラス名';
COMMENT ON COLUMN mente.column_attr_info.column_style IS 'CSSスタイル';
COMMENT ON COLUMN mente.column_attr_info.column_level IS 'レベル1、2、3などを表示する。';
COMMENT ON COLUMN mente.column_attr_info.column_required IS '日数項目１は必須';
COMMENT ON COLUMN mente.column_attr_info.column_multiple IS '複数選択(セレクト場合)';
COMMENT ON COLUMN mente.column_attr_info.column_parent_id IS '親ID';
COMMENT ON COLUMN mente.column_attr_info.column_options IS '参照OPTIONS';
COMMENT ON COLUMN mente.column_attr_info.column_add IS '新規使用０は可能';
COMMENT ON COLUMN mente.column_attr_info.column_edit IS '編集使用０は可能';
COMMENT ON COLUMN mente.column_attr_info.column_search IS '検索使用０は可能';
COMMENT ON COLUMN mente.column_attr_info.column_view IS '詳細使用０は可能';
COMMENT ON COLUMN mente.column_attr_info.column_default IS 'Default値';
COMMENT ON COLUMN mente.column_attr_info.column_order IS '表示順';
COMMENT ON COLUMN mente.column_attr_info.column_deleted IS '存在フラグ、１は削除';
COMMENT ON COLUMN mente.column_attr_info.block_id IS 'ブロックID';
COMMENT ON COLUMN mente.column_attr_info.updated_id IS '更新者';
COMMENT ON COLUMN mente.column_attr_info.updated_time IS '更新日';

CREATE SEQUENCE mente.column_value_id_seq;
CREATE TABLE mente.column_value_info (
  column_value_id INTEGER NOT NULL DEFAULT nextval('mente.column_value_id_seq'::regclass),
  column_label varchar(30) NOT NULL DEFAULT '',
  column_lang varchar(3) NOT NULL DEFAULT 'ja',
  column_id INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT pk_column_value_id PRIMARY KEY (column_value_id, column_lang),
  CONSTRAINT fk_column_value_info_column_id FOREIGN KEY (column_id) REFERENCES mente.column_attr_info(column_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE mente.column_value_info IS '各ラベル項目のDefault直情報';
COMMENT ON COLUMN mente.column_value_info.column_id IS 'ID';
COMMENT ON COLUMN mente.column_value_info.column_label IS 'ラベル表示名';
COMMENT ON COLUMN mente.column_value_info.column_lang IS '言語';
COMMENT ON COLUMN mente.column_value_info.column_id IS '項目ID';

CREATE SEQUENCE mente.option_ja_id_seq;
CREATE TABLE mente.option_ja_info (
  option_ja_id INTEGER NOT NULL DEFAULT nextval('mente.option_ja_id_seq'::regclass),
  option_name varchar(50) NOT NULL DEFAULT '',
  option_code INTEGER DEFAULT 0,
  option_value varchar(70) NOT NULL DEFAULT '',
  option_order INTEGER NOT NULL DEFAULT 0
) PARTITION BY LIST (option_name);
COMMENT ON TABLE mente.option_ja_info IS '各選択BOX項目情報「JP」';
COMMENT ON COLUMN mente.option_ja_info.option_name IS '項目FIELD名';
COMMENT ON COLUMN mente.option_ja_info.option_value IS '値';
CREATE TABLE mente.sex_jp PARTITION OF mente.option_ja_info FOR VALUES IN ('sex');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('sex', '男性');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('sex', '女性');
CREATE TABLE mente.on_off_jp PARTITION OF mente.option_ja_info FOR VALUES IN ('onoff');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('onoff', 'オン');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('onoff', 'オフ');
CREATE TABLE mente.flag_jp PARTITION OF mente.option_ja_info FOR VALUES IN ('flag');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('flag', '可');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('flag', '非');
CREATE TABLE mente.deleted_jp PARTITION OF mente.option_ja_info FOR VALUES IN ('deleted');
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('deleted', '未', 0);
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('deleted', '済', 1);
CREATE TABLE mente.age_jp PARTITION OF mente.option_ja_info FOR VALUES IN ('age');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '10以下');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '20代');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '30代');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '40代');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '50代');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '60代');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '70代');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '80代');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '90代');
INSERT INTO mente.option_ja_info(option_name, option_value) values ('age', '90以上');
CREATE TABLE mente.sysauth_jp PARTITION OF mente.option_ja_info FOR VALUES IN ('sysauth');
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('sysauth', 'ログイン', 0);
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('sysauth', '顔認証', 1);
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('sysauth', 'QRコード認証', 2);
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('sysauth', 'ワンタイムパスワード', 3);
CREATE TABLE mente.sysapi_jp PARTITION OF mente.option_ja_info FOR VALUES IN ('sysapi');
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('sysapi', 'APIモード', 0);
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('sysapi', 'システムモード', 1);
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('sysapi', '全て', 2);
CREATE TABLE mente.user_manager_jp PARTITION OF mente.option_ja_info FOR VALUES IN ('user_manager');
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('user_manager', '管理者', 0);
INSERT INTO mente.option_ja_info(option_name, option_value, option_code) values ('user_manager', 'ユーザー', 1);

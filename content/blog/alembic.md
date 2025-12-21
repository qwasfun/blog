# 使用 Alembic 实现数据迁移管理

## 初次使用

安装依赖

```shell
uv add alembic
```

初始化 Alembic 迁移工具

```shell
alembic init alembic
```

创建初始迁移

```shell
alembic revision --autogenerate -m "Initial migration"
```

在 `database.py` 中创建迁移函数 `run_migrations()`

```python
def run_migrations():
    try:
        logger.info("Running database migrations...")
        # Assuming alembic.ini is in the current working directory or parent directory
        # We can try to locate it
        alembic_ini_path = "alembic.ini"
        if not os.path.exists(alembic_ini_path):
             # Try looking one level up if we are running from app/
             alembic_ini_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "alembic.ini")

        if not os.path.exists(alembic_ini_path):
            logger.warning("alembic.ini not found, skipping migrations.")
            return

        alembic_cfg = Config(alembic_ini_path)
        # Ensure script_location is absolute or correct relative to CWD
        # If alembic.ini has script_location = alembic, it expects alembic folder in CWD.
        # If we are in api/, it works.

        command.upgrade(alembic_cfg, "head")
        logger.info("Database migrations completed.")
    except Exception as e:
        logger.error(f"Error running migrations: {e}")
        # Re-raise to fail startup if migration fails
        raise e
```

修改了 app.py，在应用启动（lifespan）时自动调用 `run_migrations()`。

## 当修改数据字段时

当修改了数据模型（例如在 models.py 中添加了新字段）并准备发布新版本时

1. 生成迁移脚本（在开发环境中）

```pyhton
alembic revision --autogenerate -m "描述您的更改（例如：添加用户手机号字段）"
```

2. 检查迁移脚本

确认 `upgrade()` 和 `downgrade()` 函数中的变更

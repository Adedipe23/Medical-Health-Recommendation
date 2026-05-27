from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token
from app.schemas.auth_schema import RegisterRequest, LoginRequest


def register_user(req: RegisterRequest, db: Session) -> User:
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise ValueError("Email already registered")
    user = User(
        name=req.name,
        email=req.email,
        password_hash=hash_password(req.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(req: LoginRequest, db: Session) -> str:
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.password_hash):
        raise ValueError("Invalid email or password")
    return create_access_token(data={"sub": str(user.id)})


def get_current_user(token: str, db: Session) -> User:
    from app.core.security import decode_access_token
    payload = decode_access_token(token)
    if payload is None:
        raise ValueError("Invalid or expired token")
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise ValueError("User not found")
    return user

import './Card.css'

function Card({ title, value, icon, description }) {
  return (
    <article className="financial-card">
      <div className="financial-card__header">
        <span className="financial-card__title">{title}</span>

        <div className="financial-card__icon">
          {icon}
        </div>
      </div>

      <strong className="financial-card__value">
        {value}
      </strong>

      <span className="financial-card__description">
        {description}
      </span>
    </article>
  )
}

export default Card
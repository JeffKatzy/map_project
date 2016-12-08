class ScoresController < ApplicationController
  def index
    user_id = Auth.decode(params["jwt"])["user_id"]
    if user_id
      user = User.find(user_id)

      human_scores = User.order(days_survived: :desc).limit(10)
      human_scores_json = human_scores.each_with_object([]) do |user, array|
        array << {
          username: user.username,
          score: user.days_survived,
          key: user.username
        }
      end

      zombie_scores = User.order(humans_infected: :desc).limit(10)
      zombie_scores_json = zombie_scores.each_with_object([]) do |user, array|
        array << {
          username: user.username,
          score: user.humans_infected,
          key: user.username
        }
      end

      render json: {
        user: {
          username: user.username,
          days_survived: user.days_survived,
          humans_infected: user.humans_infected
        },
        scores: {
          human: {
            list: human_scores_json,
            id: "Human"
          },
          zombie: {
            list: zombie_scores_json,
            id: "Zombie"
          }
        }
      }
    else
      render json: {
        error: "some sort of jwt error"
      }
    end
  end
end

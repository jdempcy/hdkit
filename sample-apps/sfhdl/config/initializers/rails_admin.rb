RailsAdmin.config do |config|
  config.asset_source = :sprockets

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == CancanCan ==
  # config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/railsadminteam/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  # config.navigation_static_links = {
  #   'sidekiq web' => '/sidekiq',
  #   'pghero' => '/pghero',
  #   'searchjoy' => '/searchjoy',
  #   'exception-track' => '/exception-track'
  # }
  # config.model Group do
  #   edit do
  #     field :name
  #     field :image, :carrierwave
  #     field :desc
  #     field :weight
  #     field :key_word
  #     field :meta_desc
  #   end
  # end

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end

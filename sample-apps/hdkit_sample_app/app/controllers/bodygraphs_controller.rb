class BodygraphsController < ApplicationController
  include ActionView::Helpers::SanitizeHelper
  include BodygraphsHelper
  require 'swe4r'

  before_action :set_bodygraph, only: %i[show edit update destroy]

  # GET /bodygraphs or /bodygraphs.json
  def index
    @bodygraphs = Bodygraph.all
  end

  # GET /bodygraphs/1 or /bodygraphs/1.json
  def show; end

  # GET /bodygraphs/new
  def new
    @bodygraph = Bodygraph.new
  end

  # GET /bodygraphs/1/edit
  def edit; end

  # POST /bodygraphs or /bodygraphs.json
  def create
    respond_to do |format|
      if (@bodygraph = build_bodygraph(bodygraph_params)) && @bodygraph.save
        format.html { redirect_to bodygraph_url(@bodygraph), notice: 'Bodygraph was successfully created.' }
        format.json { render :show, status: :created, location: @bodygraph }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @bodygraph.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bodygraphs/1 or /bodygraphs/1.json
  def update
    respond_to do |format|
      if (@bodygraph = build_bodygraph(bodygraph_params, @bodygraph.id)) && @bodygraph.update(bodygraph_params)
        format.html { redirect_to bodygraph_url(@bodygraph), notice: 'Bodygraph was successfully updated.' }
        format.json { render :show, status: :ok, location: @bodygraph }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @bodygraph.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bodygraphs/1 or /bodygraphs/1.json
  def destroy
    @bodygraph.destroy

    respond_to do |format|
      format.html { redirect_to bodygraphs_url, notice: 'Bodygraph was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_bodygraph
    @bodygraph = Bodygraph.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def bodygraph_params
    params.require(:bodygraph).permit(:name, :birth_date_local, :birth_date_utc, :design_date_utc, :birth_country,
                                      :birth_city, :birth_date, :birth_time, :aura_type, :inner_authority, :definition, :profile, :incarnation_cross, :determination, :environment, :view, :motivation, :cognition, :sense, :variable, :personality_activations, :design_activations, :head_defined, :ajna_defined, :throat_defined, :spleen_defined, :solar_plexus_defined, :g_center_defined, :sacral_defined, :root_defined, :ego_defined, :personality_nodes_tone, :design_nodes_tone, :timezone, :user_id, :all_activated_gates)
  end

end
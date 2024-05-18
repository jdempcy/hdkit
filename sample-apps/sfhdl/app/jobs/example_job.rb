class ExampleJob < ApplicationJob
  queue_as :default

  # ExampleJob.perform_later
  # Enqueue a job to be performed 1 week from now.
  # GuestsCleanupJob.set(wait: 1.week).perform_later(guest)
  def perform(*args)
    # Do something later
  end
end

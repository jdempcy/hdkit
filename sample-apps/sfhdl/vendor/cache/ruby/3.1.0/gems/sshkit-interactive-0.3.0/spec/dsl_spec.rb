describe SSHKit::Interactive::DSL do
  describe '#run_interactively' do
    include SSHKit::Interactive::DSL

    let(:host) { SSHKit::Host.new('example.com') }

    it 'will execute interactively' do
      expect_system_call('ssh -t -A example.com \'$SHELL -l -c "/usr/bin/env ls"\'')

      run_interactively host do
        execute(:ls)
      end
    end

    it 'will use specified shell' do
      expect_system_call('ssh -t -A example.com \'/bin/bash -l -c "/usr/bin/env ls"\'')

      run_interactively host, shell: '/bin/bash' do
        execute(:ls)
      end
    end

    it 'does not support switching hosts' do
      expect {
        run_interactively host do
          on host do
            execute(:ls)
          end
        end
      }.to raise_error(SSHKit::Interactive::Unsupported)
    end
  end
end

describe SSHKit::Interactive::Backend do
  describe '#execute' do
    let(:host)    { SSHKit::Host.new('example.com') }
    let(:backend) { SSHKit::Interactive::Backend.new(host) }

    it 'does a system call with the SSH command' do
      expect_system_call('ssh -t -A example.com \'$SHELL -l -c "/usr/bin/env ls"\'')
      backend.execute('ls')
    end

    it 'respects the specified directory' do
      backend.within('/var/log') do
        expect_system_call('ssh -t -A example.com \'$SHELL -l -c "cd /var/log && /usr/bin/env ls"\'')

        backend.execute('ls')
      end
    end

    it 'respects the specified user' do
      backend.as('deployer') do
        expect_system_call('ssh -t -A example.com \'$SHELL -l -c "sudo -u deployer -- sh -c \\"/usr/bin/env ls\\""\'')

        backend.execute('ls')
      end
    end

    it 'respects the specified group' do
      expect {
        backend.as(user: :user, group: :group) do
          backend.execute('ls')
        end
      }.to raise_error(SSHKit::Interactive::Unsupported)
    end

    it 'respects the specified env' do
      backend.with(foo: :bar) do
        expect_system_call('ssh -t -A example.com \'$SHELL -l -c "( export FOO="bar" ; /usr/bin/env ls )"\'')

        backend.execute('ls')
      end
    end

    it 'respects the specified shell' do
      expect_system_call('ssh -t -A example.com \'/bin/bash -l -c "/usr/bin/env ls"\'')

      SSHKit::Interactive::Backend.new(host, shell: '/bin/bash').execute('ls')
    end

    describe 'prevents calling unsupported operations' do
      it '#upload!' do
        expect { backend.upload!(:a, :b) }.to raise_error(::SSHKit::Backend::MethodUnavailableError)
      end

      it '#download!' do
        expect { backend.download!(:a, :b) }.to raise_error(::SSHKit::Backend::MethodUnavailableError)
      end

      it '#test' do
        expect { backend.test(:true) }.to raise_error(::SSHKit::Backend::MethodUnavailableError)
      end

      it '#capture' do
        expect { backend.capture(:ls) }.to raise_error(::SSHKit::Backend::MethodUnavailableError)
      end
    end
  end
end
